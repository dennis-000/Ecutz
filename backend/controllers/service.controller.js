import mongoose from "mongoose";
import Service from "../models/service.model.js";

export const getAllServices = async (req, res) => {
    try {
        const services = await Service.find({})
        res.status(200).json({success: true, data: services, message: "Services retrieved successfully"})
    } catch (error) {
        console.log("Error in fetching services: ", error.message);
        return res.status(500).json({success: false, message: `Server Error: ${error.message}`})
    }
}

export const getSingleService = async (req, res) => {
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
}

export const createNewService = async (req, res) => {
    const request = req.body

    const existingService = await Service.findOne({ title: request.title })

    if(existingService){
        return res.status(400).json({success: false, message: "Service already exists"})
    }
    
    const newService = new Service(request)

    try {
        await newService.save()

        await createAuditLog(req.user ? req.user._id : "system", newService._id, "Service", "create", "Service created"); //Log user creation

        res.status(201).json({success: true, message: "Service created successfully", data: newService})
    } catch (error) {
        console.log("Error occured while saving service: ", error.message);
        return res.status(500).json({success: false, message: `Server Error: ${error.message}`})
    }
}

export const updateService = async (req, res) => {
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

        await createAuditLog(req.user ? req.user._id : "system", id, "Service", "update", `Service updated with changes: ${JSON.stringify(service)}`);

        res.status(200).json({success: true, message: "Service Updated successfully", data: updatedService})
    } catch(error) {
        console.log(`Error occured while updating service with id ${id}: `, error.message);
        return res.status(500).json({success: false, message: `Server Error: ${error.message}`})
    }
}

export const deleteService = async (req, res) => {
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

        await createAuditLog(req.user ? req.user._id : "system", id, "Service", "delete", `Service deleted`);
        
        res.status(200).json({success: true, message: "Service Deleted successfully"})

    } catch (error) {
        console.log(`Error occurred while deleting service with id${id}: ${error.message}`)
        return res.status(500).json({success: false, message: `Server Error: ${error.message}`})
    }
}