import mongoose from "mongoose";
import Appointment from "../models/appointment.model.js";
import { appointmentIsActive } from "../server.js";
import { createAuditLog } from "./audit.controller.js";
import ProviderService from '../models/providerService.model.js';


export const getAllAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find({})
        res.status(200).json({success: true, data: appointments, message: "Appointments retrieved successfully"})
    } catch (error) {
        console.log("Error occurred while fetching appointments: ", error.message);
        return res.status(500).json({success: false, message: `Server Error: ${error.message}`})
    }
}

export const getSingleAppointment = async (req, res) => {
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
}

export const createAppointment = async (req, res) => {
    const request = req.body
    request.customer = req.user.id
    try {
        const existingAppointment = await Appointment.findOne({ customer: request.customer, provider: request.provider, date: request.date })

        if(existingAppointment && appointmentIsActive(existingAppointment)){
            return res.status(400).json({success: false, message: "Appointment already exists for the selected date"})
        }
    
        const newAppointment = new Appointment(request)
        const savedAppointment = await newAppointment.save()

        await createAuditLog(req.user ? req.user.id : "system", newAppointment._id, "Appointment", "create", "Appointment created");

        res.status(201).json({ success: true, message: "Appointment created successfully", data: savedAppointment })
    } catch (error) {
        console.log("Error occured while saving Appointment: ", error.message);
        return res.status(500).json({success: false, message: `Server Error: ${error.message}`})
    }
}

export const updateAppointment = async (req, res) => {
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

        await createAuditLog(req.user ? req.user.id : "system", id, "Appointment", "update", `Appointment updated with changes: ${JSON.stringify(updatedAppointment)}`);

        res.status(200).json({success: true, message: "Appointment Updated successfully", data: updatedAppointment})
    } catch(error) {
        console.log(`Error occured while updating appointment with id ${id}: `, error.message);
        return res.status(500).json({success: false, message: `Server Error: ${error.message}`})
    }
}

export const deleteAppointment = async (req, res) => {
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

        await createAuditLog(req.user ? req.user.id : "system", id, "Appointment", "delete", `Appointment deleted`);

        res.status(200).json({success: true, message: "Appointment Deleted successfully"})

    } catch (error) {
        console.log(`Error in deleting appointment with id ${id}: ${error.message}`)
        return res.status(500).json({success: false, message: `Server Error: ${error.message}`})
    }
}

export const getUserAppointments = async(req,res) => {
    try {
        // Ensure you're using 'customer' instead of 'user'
        const appointments = await Appointment.find({ customer: req.user.id })

        if(!appointments || appointments.length === 0){
            return res.status(404).json({ 
                success: false, 
                message: "No appointments found" 
            });
        }

        res.status(200).json({
            success: true,
            message: "Appointments fetched successfully",
            data: appointments
        });
    } catch (err) {
        res.status(500).json({
            success: false, 
            message: "Something went wrong, cannot get user appointments"
        });
    }
}