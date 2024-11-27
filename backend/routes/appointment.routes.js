import { Router } from "express";
import { createAppointment, deleteAppointment, getAllAppointments, getSingleAppointment, updateAppointment } from "../controllers/appointment.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";

const appointmentRouter = Router()

//Appointment
appointmentRouter.get("/", getAllAppointments)
appointmentRouter.get("/:id", getSingleAppointment)//Get a single appointment
appointmentRouter.post("/", requireAuth, createAppointment)
appointmentRouter.patch("/:id",requireAuth, updateAppointment)
appointmentRouter.delete("/:id",requireAuth, deleteAppointment)

export default appointmentRouter