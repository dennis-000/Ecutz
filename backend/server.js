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
import cron from 'node-cron'
import { createNewUser, deleteUser, getAllCustomers, getAllProviders, getAllUsers, getSingleUserById, updateUser } from "./controllers/user.controller.js"
import { createNewProviderService, deleteProviderService, getAllProviderService, getSingleProviderService, updateProviderService } from "./controllers/providerService.controller.js"
import { createNewService, deleteService, getAllServices, getSingleService, updateService } from "./controllers/service.controller.js"
import { createAppointment, deleteAppointment, getAllAppointments, getSingleAppointment, updateAppointment } from "./controllers/appointment.controller.js"
import { createNewReview, deleteReview, getAllReviews, getSingleUserReviews, updateReview } from "./controllers/review.controller.js"
import userRouter from "./routes/user.routes.js"
import serviceRouter from "./routes/service.routes.js"
import reviewRouter from "./routes/review.routes.js"
import providerServiceRouter from "./routes/providerService.routes.js"
import appointmentRouter from "./routes/appointment.routes.js"
import auditRouter from "./routes/audit.routes.js"
import cors from 'cors'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000
app.use(cors())

app.use(express.json()) //allows us to accept json data in the req.body
app.use("/api/users", userRouter)
app.use("/api/services", serviceRouter)
app.use("/api/reviews", reviewRouter)
app.use("/api/provider-services", providerServiceRouter)
app.use("/api/audit-logs", auditRouter)
app.use("/api/appointments", appointmentRouter)

//cron job
// Start background job
cron.schedule('* * * * *', updateExpiredAppointments); // Every minute

//function to hash passwords
export const hashPassword = async (password) => {
    try {
        const saltRounds = 10; // Number of salt rounds (the higher, the more secure but slower)
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        throw new Error("Error hashing password: " + error.message);
    }
};



export const appointmentIsActive = (appointmentObject) => {
    if(appointmentObject.status === "pending" || appointmentObject.status === "in-progress"){
        return true
    }
    return false
}

//Login
app.post("/api/login", async (req, res) => {
    //login code here
})

app.listen(PORT, () => {
    connectDB()
    console.log("Server started at http://localhost:" + PORT);
})