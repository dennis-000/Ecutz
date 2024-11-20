import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./config/db.js"
import multer from "multer"
import bcrypt from "bcrypt"
import updateExpiredAppointments from './controllers/cron.controller.js'; // Your cron job
import cron from 'node-cron'
import userRouter from "./routes/user.routes.js"
import serviceRouter from "./routes/service.routes.js"
import reviewRouter from "./routes/review.routes.js"
import providerServiceRouter from "./routes/providerService.routes.js"
import appointmentRouter from "./routes/appointment.routes.js"
import auditRouter from "./routes/audit.routes.js"
import cors from 'cors'
import loginRouter from "./routes/auth.routes.js"
import cookieParser from "cookie-parser"
import cloudinary from "./config/cloudinary.config.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000
app.use(cors())

app.use(express.json()) //allows us to accept json data in the req.body
app.use(cookieParser());

app.use("/api/users", userRouter)
app.use("/api/services", serviceRouter)
app.use("/api/reviews", reviewRouter)
app.use("/api/provider-services", providerServiceRouter)
app.use("/api/audit-logs", auditRouter)
app.use("/api/appointments", appointmentRouter)
app.use("/api", loginRouter)

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


app.listen(PORT, () => {
    connectDB()
    console.log("Server started at http://localhost:" + PORT);
})