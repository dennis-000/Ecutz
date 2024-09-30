import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./config/db.js"
import User from "./models/user.model.js"
import Service from "./models/service.model.js"
import Appointment from "./models/appointment.model.js"
import Review from "./models/review.model.js"
import AuditLog from "./models/audit.model.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json()) //allows us to accept json data in the req.body

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
        res.status(200).json({success: true, message: "Audit Log fetched successfully", data: auditLogs})
    } catch (error) {
        console.error("Failed to get audit logs:", error);
        return res.status(200).json({success: true, message: "Audit Log fetched successfully", data: auditLogs})    }
}

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

app.get("/api/users/:id", async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false, message: "User not found"})
    }

    try {
        const user = await User.findById(id)
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.status(200).json({success: true, data: user, message: "User retrieved successfully"})
    } catch (error) {
        console.log("Error in fetching users: ", error.message);
        return res.status(500).json({success: false, message: `Server Error: ${error.message}`})
    }
})

app.post("/api/users", async (req, res) => {
    const request = req.body

    const existingUser = await Product.findOne({ email: request.email })

    if(existingUser){
        return res.status(400).json({success: false, message: "User already exists"})
    }
    
    const newUser = new User(request)

    try {
        const newCreatedUser = await newUser.save()

        await createAuditLog(req.user._id, newCreatedUser._id, "User", "create", "User created"); //Log user creation

        res.status(201).json({success: true, message: "User created successfully"})
    } catch (error) {
        return res.status(500).json({success: false, message: `Server Error: ${error.message}`})
    }
})

app.put("/api/users/:id", async (req, res) => {
    const { id } = req.params

    const request = req.body

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false, message: "User not found"})
    }

    try{
        const newUser = await User.findByIdAndUpdate(id, request, { new: true })

        if (!newUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        await createAuditLog(req.user._id, id, `User", "update", "Updated user with changes: ${JSON.stringify(newUser)}`);

        res.status(200).json({success: true, message: "User Updated successfully", data: newUser,})
    } catch(error) {
        return res.status(500).json({success: false, message: `Server Error: ${error.message}`})
    }
})

app.delete("/api/users/:id", async (req, res) => {
    const { id } = req.params
    console.log("id:",id);

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false, message: "User not found"})
    }

    try {
        const deletedUser = await User.findByIdAndDelete(id)

        if (!deletedUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        await createAuditLog(req.user._id, deletedUser._id, "User", "delete", "User Deleted"); //Log user deletion

        res.status(200).json({success: true, message: "User Deleted successfully"})
    } catch (error) {
        console.log(`Error in Delete User: ${error.message}`)
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

app.post("/api/services", async (req, res) => {
    const request = req.body

    const existingService = await Service.findOne({ title: request.title, provider: request.provider })

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

app.put("/api/services/:id", async (req, res) => {
    const { id } = req.params

    const service = req.body

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false, message: "Service not found"})
    }

    try{
        const newService = await Service.findByIdAndUpdate(id, service, { new: true })

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        await createAuditLog(req.user._id, id, "Service", "update", `Service updated with changes: ${JSON.stringify(updates)}`);

        res.status(200).json({success: true, message: "Service Updated successfully", data: newService})
    } catch(error) {
        console.log("Error occured while updating service: ", error.message);
        return res.status(500).json({success: false, message: `Server Error: ${error.message}`})
    }
})

app.delete("/api/services/:id", async (req, res) => {
    const { id } = req.params
    console.log("id:",id);

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false, message: "User not found"})
    }

    try {
        await Service.findByIdAndDelete(id)

        await createAuditLog(req.user._id, id, "Service", "delete", `Service deleted`);
        
        res.status(200).json({success: true, message: "Service Deleted successfully"})

    } catch (error) {
        console.log(`Error occurred while deleting service: ${error.message}`)
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

app.post("/api/appointments", async (req, res) => {
    const request = req.body

    const existingAppointment = await Appointment.findOne({ title: request.title, provider: request.provider })

    if(existingAppointment){
        return res.status(400).json({success: false, message: "Appointment already exists"})
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

app.put("/api/appointments/:id", async (req, res) => {
    const { id } = req.params

    const request = req.body

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false, message: "Appointment not found"})
    }
    
    try{
        const newAppointment = await Appointment.findByIdAndUpdate(id, request, { new: true })

        await createAuditLog(req.user._id, id, "Appointment", "update", `Appointment updated with changes: ${JSON.stringify(newAppointment)}`);

        res.status(200).json({success: true, message: "Appointment Updated successfully", data: newAppointment})
    } catch(error) {
        console.log("Error occured while updating appointments: ", error.message);
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
        await Appointment.findByIdAndDelete(id)

        await createAuditLog(req.user._id, id, "Appointment", "delete", `Appointment deleted`);

        res.status(200).json({success: true, message: "Appointment Deleted successfully"})

    } catch (error) {
        console.log(`Error in deleting Appointment: ${error.message}`)
        return res.status(500).json({success: false, message: `Server Error: ${error.message}`})
    }
})

//Review
app.get("/api/reviews", async (req, res) => {
    try {
        const Reviews = await Review.find({})
        res.status(200).json({success: true, data: Reviews, message: "Reviews retrieved successfully"})
    } catch (error) {
        console.log("Error in fetching reviews: ", error.message);
        return res.status(500).json({success: false, message: `Server Error: ${error.message}`})
    }
})

//Get all reviews of a particular user
app.get("/api/reviews/user/:id", async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false, message: "User not found"})
    }

    try {
        const Reviews = await Review.find({ customer: id })
        res.status(200).json({success: true, data: Reviews, message: "Reviews retrieved successfully"})
    } catch (error) {
        console.log("Error in fetching reviews: ", error.message);
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

app.put("/api/reviews/:id", async (req, res) => {
    const { id } = req.params

    const request = req.body

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false, message: "Review not found"})
    }

    try{
        const newReview = await Review.findByIdAndUpdate(id, request, { new: true })

        await createAuditLog(req.user._id, newReview._id, "Review", "update", `Review updated with changes: ${JSON.stringify(newReview)}`);

        res.status(200).json({success: true, message: "Review updated successfully", data: newReview})
    } catch(error) {
        console.log("Error occured while updating review: ", error.message);
        return res.status(500).json({success: false, message: `Server Error: ${error.message}`})
    }
})

app.delete("/api/reviews/:id", async (req, res) => {
    const { id } = req.params
    console.log("id:",id);

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false, message: "Review not found"})
    }

    try {
        await Review.findByIdAndDelete(id)

        await createAuditLog(req.user._id, newReview._id, "Review", "delete", "Review deleted");

        res.status(200).json({success: true, message: "Review Deleted successfully"})

    } catch (error) {
        console.log(`Error in deleting review: ${error.message}`)
        return res.status(500).json({success: false, message: `Server Error: ${error.message}`})
    }
})



app.listen(PORT, () => {
    connectDB()
    console.log("Server started at http://localhost:" + PORT);
})