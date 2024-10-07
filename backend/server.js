import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./config/db.js"
import User from "./models/user.model.js"
import Service from "./models/service.model.js"
import Appointment from "./models/appointment.model.js"
import Review from "./models/review.model.js"
import AuditLog from "./models/audit.model.js"
import multer from "multer"
import bcrypt from "bcrypt"
import ProviderService from "./models/providerService.model.js"
import fs from 'fs';
import path from 'path';
import updateExpiredAppointments from './controllers/cron.controller.js'; // Your cron job

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json()) //allows us to accept json data in the req.body

//cron job
// Start background job
cron.schedule('* * * * *', updateExpiredAppointments); // Every minute


//function to hash passwords
const hashPassword = async (password) => {
    try {
        const saltRounds = 10; // Number of salt rounds (the higher, the more secure but slower)
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        throw new Error("Error hashing password: " + error.message);
    }
};

//multer code
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/profilepics"); // Directory where files will be saved
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + "-" + uniqueSuffix + "." + file.mimetype.split("/")[1]); // File naming convention
    },
  });
  
  const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 }, // Limit file size to 5MB
  });

//function or middleware to create an audit log 
const createAuditLog = async (userId, targetId, targetModel, action, details) => {
    try {
        const logEntry = new AuditLog({
        user: userId,
        target: targetId,
        targetModel: targetModel,
        action: action,
        details: details,
        });
        await logEntry.save();
    } catch (error) {
        console.error("Failed to create audit log:", error);
    }
};

const getAllAuditLogs = async (req, res) => {
    try {
        const auditLogs = await AuditLog.find({}).sort({ timesptamp: -1})
        res.status(200).json({success: true, message: auditLogs.length === 0 ? "No audit logs have been added" : "Audit Log fetched successfully", data: auditLogs})
    } catch (error) {
        console.error("Failed to get audit logs:", error);
        return res.status(200).json({success: true, message: "Audit Log fetched successfully", data: auditLogs})    }
}

const appointmentIsActive = (appointmentObject) => {
    if(appointmentObject.status === "pending" || appointmentObject.status === "in-progress"){
        return true
    }
    return false
}

//Login
app.post("api/login", async (req, res) => {
    //login code here
})

//Get all audit logs
app.get("/api/audit-logs", getAllAuditLogs)


//Users
app.get("/api/users", async (req, res) => {
    try {
        const users = await User.find({})
        res.status(200).json({success: true, data: users, message: "Users retrieved successfully"})
    } catch (error) {
        console.log("Error in fetching users: ", error.message);
        return res.status(500).json({success: false, message: `Server Error: ${error.message}`})
    }
})

//Get all providers
app.get("/api/users/providers", async (req, res) => {
    try {
        const users = await User.find({ role: "provider" })
        res.status(200).json({success: true, data: users, message: "Providers retrieved successfully"})
    } catch (error) {
        console.log("Error in fetching providers: ", error.message);
        return res.status(500).json({success: false, message: `Server Error: ${error.message}`})
    }
})

//Get all customers
app.get("/api/users/customers", async (req, res) => {
    try {
        const users = await User.find({ role: "customer" })
        res.status(200).json({success: true, data: users, message: "Users retrieved successfully"})
    } catch (error) {
        console.log("Error in fetching users: ", error.message);
        return res.status(500).json({success: false, message: `Server Error: ${error.message}`})
    }
})

//Get a single user
app.get("/api/users/:id", async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false, message: "Invalid User ID"})
    }

    try {
        const user = await User.findById(id)
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.status(200).json({success: true, data: user, message: "User retrieved successfully"})
    } catch (error) {
        console.log(`Error in fetching user with id ${id}: `, error.message);
        return res.status(500).json({success: false, message: `Server Error: ${error.message}`})
    }
})

app.post("/api/users", upload.single("profilePicture"), async (req, res) => {
    try {
    const { name, email, password, role, phone, location, verified, status, profilePicture } = req.body

    const existingUser = await User.findOne({ email })

    if(existingUser){
        return res.status(400).json({success: false, message: "User already exists"})
    }
    
    const hash = await hashPassword(password)

    const newUser = new User({
        name,
        email,
        password: hash,
        role,
        phone,
        location,
        status: role === "provider" ? "inactive" : "active",
        profilePicture: req.file ? `uploads/profilePictures/${req.file.filename}` : null,
    })

    const newCreatedUser = await newUser.save()

    await createAuditLog(req.user._id, newCreatedUser._id, "User", "create", "User created"); //Log user creation

    res.status(201).json({success: true, message: "User created successfully", data: newCreatedUser})
    } catch (error) {
        console.log(`Error in creating user: `, error.message);
        return res.status(500).json({success: false, message: `Server Error: ${error.message}`})
    }
})

app.patch("/api/users/:id", upload.single("profilePicture"), async (req, res) => {
    try{
    const { id } = req.params

    const { name, email, password, role, phone, location, verified, status, profilePicture } = req.body

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false, message: "Invalid User ID"})
    }
    
    // Check if user exists
    const user = await User.findById(id);
    if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
    }

     // Check if email is being updated and if it's unique
     if (email && email !== user.email) {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "Email already in use" });
        }
    }

     // Update profile picture if provided and delete the old one
     const updatedProfilePic = user.profilePicture
     if (req.file) {
        // Delete old profile picture if it exists
        if (user.profilePicture && fs.existsSync(path.join(__dirname, `${user.profilePicture}`))) {
            fs.unlinkSync(path.join(__dirname, `${user.profilePicture}`));
        }
        
        // Update with new profile picture
        updatedProfilePic = `uploads/profilePictures/${req.file.filename}`;
    }

    let hash = user.password
    if(password){
        hash = await hashPassword(password)
    }

    const updatedUser = {
        name: name || user.name,
        email: email || user.email,
        password: hash,
        role: role || user.role,
        phone: phone || user.phone,
        location: location || user.location,
        status: status || user.status,
        profilePicture: req.file ? updatedProfilePic : profilePicture,
    }


        const newUpdatedUser = await User.findByIdAndUpdate(id, updatedUser, { new: true })

        if (!newUpdatedUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        await createAuditLog(req.user._id, id, `User", "update", "Updated user with changes: ${JSON.stringify(updatedUser)}`);

        res.status(200).json({success: true, message: "User Updated successfully", data: newUpdatedUser,})
    } catch(error) {
        console.log(`Error in fetching user with id ${id}: `, error.message);
        return res.status(500).json({success: false, message: `Server Error: ${error.message}`})
    }
})

app.delete("/api/users/:id", async (req, res) => {
    const { id } = req.params
    console.log("id:",id);

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false, message: "Invalid User ID"})
    }

    try {
        const deletedUser = await User.findByIdAndDelete(id)

        if (!deletedUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

         // Delete profile picture if it exists
         if (deletedUser.profilePicture && fs.existsSync(path.join(__dirname, deletedUser.profilePicture))) {
            fs.unlinkSync(path.join(__dirname, deletedUser.profilePicture));
        }

        await createAuditLog(req.user._id, deletedUser._id, "User", "delete", "User Deleted"); //Log user deletion

        res.status(200).json({success: true, message: "User Deleted successfully"})
    } catch (error) {
        console.log(`Error in deleting user with id ${id}: ${error.message}`)
        return res.status(500).json({success: false, message: `Server Error: ${error.message}`})
    }
})


//Provider Service
app.get("/api/provider-services", async (req, res) => {
    try {
        const providerServices = await ProviderService.find({})
        res.status(200).json({success: true, data: providerServices, message: "Provider Services retrieved successfully"})
    } catch (error) {
        console.log("Error in fetching services: ", error.message);
        return res.status(500).json({success: false, message: `Server Error: ${error.message}`})
    }
})

//Get a single provider service
app.get("/api/provider-services/:id", async (req, res) => {
    const { id } = req.params

    //Check if id is a valid mongoose valid
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false, message: "Invalid service id"})
    }

    try {
        const providerService = await ProviderService.findById(id)
        if (!providerService) {
            return res.status(404).json({ success: false, message: "Provider Service not found" });
        }
        res.status(200).json({success: true, data: providerService, message: "Provider Services retrieved successfully"})
    } catch (error) {
        console.log(`Error in fetching provider's services with id ${id}: `, error.message);
        return res.status(500).json({success: false, message: `Server Error: ${error.message}`})
    }
})


app.post("/api/provider-services", async (req, res) => {
    const request = req.body

    if (!request.provider || !request.service) {
        return res.status(400).json({ success: false, message: "Provider and Service are required" });
    }

    try {
        const existingService = await ProviderService.findOne({ provider: request.provider, service: request.service })
        if(existingService){
            return res.status(400).json({success: false, message: "Service already exists"})
        }
        
        const newProviderService = new ProviderService(request)
        await newProviderService.save()

        await createAuditLog(req.user._id, newProviderService._id, "ProviderService", "create", "Provider Service created"); //Log provider service creation

        res.status(201).json({success: true, message: "Provider Service created successfully", data: newProviderService})
    } catch (error) {
        console.log("Error occured while saving service: ", error.message);
        return res.status(500).json({success: false, message: `Server Error: ${error.message}`})
    }
})

app.patch("/api/provider-services/:id", async (req, res) => {
    const { id } = req.params

    const providerService = req.body

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false, message: "Invalid Service ID"})
    }

    try{
        const updatedProviderService = await ProviderService.findByIdAndUpdate(id, providerService, { new: true })

        if (!updatedProviderService) {
            return res.status(404).json({ success: false, message: "Service not found" });
        }

        await createAuditLog(req.user._id, id, "ProviderService", "update", `Provider Service updated with changes: ${JSON.stringify(updatedProviderService)}`);

        res.status(200).json({success: true, message: "Provider Service Updated successfully", data: updatedProviderService})
    } catch(error) {
        console.log("Error occured while updating service: ", error.message);
        return res.status(500).json({success: false, message: `Server Error: ${error.message}`})
    }
})

app.delete("/api/provider-services/:id", async (req, res) => {
    const { id } = req.params
    console.log("id:",id);

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false, message: "Invalid Service ID"})
    }

    try {
        await ProviderService.findByIdAndDelete(id)

        await createAuditLog(req.user._id, id, "ProviderService", "delete", `Provider Service deleted`);
        
        res.status(200).json({success: true, message: "Provider Service Deleted successfully"})

    } catch (error) {
        console.log(`Error occurred while deleting service: ${error.message}`)
        return res.status(500).json({success: false, message: `Server Error: ${error.message}`})
    }
})

//Service
app.get("/api/services", async (req, res) => {
    try {
        const services = await Service.find({})
        res.status(200).json({success: true, data: services, message: "Services retrieved successfully"})
    } catch (error) {
        console.log("Error in fetching services: ", error.message);
        return res.status(500).json({success: false, message: `Server Error: ${error.message}`})
    }
})

//Get a single service
app.get("/api/services/:id", async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false, message: "Invalid Service ID"})
    }

    try {
        const service = await Service.findById(id)
        if (!service) {
            return res.status(404).json({ success: false, message: "Service not found" });
        }
        res.status(200).json({success: true, data: service, message: "Service retrieved successfully"})
    } catch (error) {
        console.log(`Error in fetching service with id ${ id }: `, error.message);
        return res.status(500).json({success: false, message: `Server Error: ${error.message}`})
    }
})

app.post("/api/services", async (req, res) => {
    const request = req.body

    const existingService = await Service.findOne({ title: request.title })

    if(existingService){
        return res.status(400).json({success: false, message: "Service already exists"})
    }
    
    const newService = new Service(request)

    try {
        await newService.save()

        await createAuditLog(req.user._id, newService._id, "Service", "create", "Service created"); //Log user creation

        res.status(201).json({success: true, message: "Service created successfully", data: newService})
    } catch (error) {
        console.log("Error occured while saving service: ", error.message);
        return res.status(500).json({success: false, message: `Server Error: ${error.message}`})
    }
})

app.patch("/api/services/:id", async (req, res) => {
    const { id } = req.params

    const service = req.body

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false, message: "Invalid Service ID"})
    }

    try{
        const updatedService = await Service.findByIdAndUpdate(id, service, { new: true })

        if (!updatedService) {
            return res.status(404).json({ success: false, message: "Service not found" });
        }

        await createAuditLog(req.user._id, id, "Service", "update", `Service updated with changes: ${JSON.stringify(service)}`);

        res.status(200).json({success: true, message: "Service Updated successfully", data: updatedService})
    } catch(error) {
        console.log(`Error occured while updating service with id ${id}: `, error.message);
        return res.status(500).json({success: false, message: `Server Error: ${error.message}`})
    }
})

app.delete("/api/services/:id", async (req, res) => {
    const { id } = req.params
    console.log("id:",id);

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false, message: "Invalid Service ID"})
    }

    try {
        const deletedService = await Service.findByIdAndDelete(id)
        if (!deletedService) {
            return res.status(404).json({ success: false, message: "Service not found" });
        }

        await createAuditLog(req.user._id, id, "Service", "delete", `Service deleted`);
        
        res.status(200).json({success: true, message: "Service Deleted successfully"})

    } catch (error) {
        console.log(`Error occurred while deleting service with id${id}: ${error.message}`)
        return res.status(500).json({success: false, message: `Server Error: ${error.message}`})
    }
})

//Appointment
app.get("/api/appointments", async (req, res) => {
    try {
        const appointments = await Appointment.find({})
        res.status(200).json({success: true, data: appointments, message: "Appointments retrieved successfully"})
    } catch (error) {
        console.log("Error occurred while fetching appointments: ", error.message);
        return res.status(500).json({success: false, message: `Server Error: ${error.message}`})
    }
})

//Get a single appointment
app.get("/api/appointments/:id", async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false, message: "Appointment not found"})
    }

    try {
        const appointment = await Appointment.findById(id)
        res.status(200).json({success: true, data: appointment, message: "Appointment retrieved successfully"})
    } catch (error) {
        console.log(`Error occurred while fetching appointment with id ${id}: `, error.message);
        return res.status(500).json({success: false, message: `Server Error: ${error.message}`})
    }
})

app.post("/api/appointments", async (req, res) => {
    const request = req.body

    const existingAppointment = await Appointment.findOne({ customer: request.customer, provider: request.provider, date: request.date })

    if(existingAppointment && appointmentIsActive(existingAppointment)){
        return res.status(400).json({success: false, message: "Appointment already exists for the selected date"})
    }
    
    const newAppointment = new Appointment(request)

    try {
        await newAppointment.save()

        await createAuditLog(req.user._id, newAppointment._id, "Appointment", "create", "Appointment created");

        res.status(201).json({success: true, message: "Appointment created successfully"})
    } catch (error) {
        console.log("Error occured while saving Appointment: ", error.message);
        return res.status(500).json({success: false, message: `Server Error: ${error.message}`})
    }
})

app.patch("/api/appointments/:id", async (req, res) => {
    const { id } = req.params

    const request = req.body

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false, message: "Appointment not found"})
    }
    
    try{
        const updatedAppointment = await Appointment.findByIdAndUpdate(id, request, { new: true })

        if(!updatedAppointment){
            return res.status(404).json({ success: false, message: "Appointment not found" });
        }

        await createAuditLog(req.user._id, id, "Appointment", "update", `Appointment updated with changes: ${JSON.stringify(updatedAppointment)}`);

        res.status(200).json({success: true, message: "Appointment Updated successfully", data: updatedAppointment})
    } catch(error) {
        console.log(`Error occured while updating appointment with id ${id}: `, error.message);
        return res.status(500).json({success: false, message: `Server Error: ${error.message}`})
    }
})

app.delete("/api/appointments/:id", async (req, res) => {
    const { id } = req.params
    console.log("id:",id);

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false, message: "Appointment not found"})
    }

    try {
        const deletedAppointment = await Appointment.findByIdAndDelete(id)

        if (!deletedAppointment) {
            return res.status(404).json({ success: false, message: "Appointment not found" });
        }

        await createAuditLog(req.user._id, id, "Appointment", "delete", `Appointment deleted`);

        res.status(200).json({success: true, message: "Appointment Deleted successfully"})

    } catch (error) {
        console.log(`Error in deleting appointment with id ${id}: ${error.message}`)
        return res.status(500).json({success: false, message: `Server Error: ${error.message}`})
    }
})

//Review
app.get("/api/reviews", async (req, res) => {
    try {
        const reviews = await Review.find({})
        res.status(200).json({success: true, data: reviews, message: "Reviews retrieved successfully"})
    } catch (error) {
        console.log("Error in fetching reviews: ", error.message);
        return res.status(500).json({success: false, message: `Server Error: ${error.message}`})
    }
})

//Get all reviews of a particular user
app.get("/api/reviews/user/:id", async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false, message: "Invalid Review ID"})
    }

    try {
        const reviews = await Review.find({ provider: id })

        if (reviews.length === 0) {
            return res.status(404).json({ success: false, message: "No reviews found for this user" });
        }

        res.status(200).json({success: true, data: reviews, message: "Reviews retrieved successfully"})
    } catch (error) {
        console.log(`Error in fetching reviews of user ${id}: `, error.message);
        return res.status(500).json({success: false, message: `Server Error: ${error.message}`})
    }
})


app.post("/api/reviews", async (req, res) => {
    const request = req.body
    
    const newReview = new Review(request)

    try {
        await newReview.save()

        await createAuditLog(req.user._id, newReview._id, "Review", "create", "Review created");

        res.status(201).json({success: true, message: "Review created successfully"})
    } catch (error) {
        console.log("Error occured while saving review: ", error.message);
        return res.status(500).json({success: false, message: `Server Error: ${error.message}`})
    }
})

app.patch("/api/reviews/:id", async (req, res) => {
    const { id } = req.params

    const request = req.body

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false, message: "Invalid Review ID"})
    }

    try{
        const newReview = await Review.findByIdAndUpdate(id, request, { new: true })

        await createAuditLog(req.user._id, newReview._id, "Review", "update", `Review updated with changes: ${JSON.stringify(newReview)}`);

        res.status(200).json({success: true, message: "Review updated successfully", data: newReview})
    } catch(error) {
        console.log(`Error occured while updating review with id ${id}: `, error.message);
        return res.status(500).json({success: false, message: `Server Error: ${error.message}`})
    }
})

app.delete("/api/reviews/:id", async (req, res) => {
    const { id } = req.params
    console.log("id:",id);

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false, message: "Invalid Review ID"})
    }

    try {
        await Review.findByIdAndDelete(id)

        await createAuditLog(req.user._id, newReview._id, "Review", "delete", "Review deleted");

        res.status(200).json({success: true, message: "Review Deleted successfully"})

    } catch (error) {
        console.log(`Error in deleting review with id ${id}: ${error.message}`)
        return res.status(500).json({success: false, message: `Server Error: ${error.message}`})
    }
})



app.listen(PORT, () => {
    connectDB()
    console.log("Server started at http://localhost:" + PORT);
})