import { Router } from "express";
import { createAppointment, deleteAppointment, getAllAppointments, getSingleAppointment, updateAppointment } from "../controllers/appointment.controller.js";

const appointmentRouter = Router()

//Appointment
appointmentRouter.get("/", getAllAppointments)
appointmentRouter.get("/:id", getSingleAppointment)//Get a single appointment
appointmentRouter.post("/", createAppointment)
appointmentRouter.patch("/:id", updateAppointment)
appointmentRouter.delete("/:id", deleteAppointment)

export default appointmentRouter