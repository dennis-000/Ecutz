import mongoose from 'mongoose'
import User from "../models/user.model.js";
import { hashPassword } from "../server.js";
import { createAuditLog } from './audit.controller.js';
import fs from 'fs'
import multer from 'multer';

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({})
        res.status(200).json({success: true, data: users, message: "Users retrieved successfully"})
    } catch (error) {
        console.log("Error in fetching users: ", error.message);
        return res.status(500).json({success: false, message: `Server Error: ${error.message}`})
    }
}

export const getAllProviders = async (req, res) => {
    try {
        const users = await User.find({ role: "provider" })
        res.status(200).json({success: true, data: users, message: "Providers retrieved successfully"})
    } catch (error) {
        console.log("Error in fetching providers: ", error.message);
        return res.status(500).json({success: false, message: `Server Error: ${error.message}`})
    }
}

export const getAllCustomers = async (req, res) => {
    try {
        const users = await User.find({ role: "customer" })
        res.status(200).json({success: true, data: users, message: "Users retrieved successfully"})
    } catch (error) {
        console.log("Error in fetching users: ", error.message);
        return res.status(500).json({success: false, message: `Server Error: ${error.message}`})
    }
}

export const getSingleUserById = async (req, res) => {
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
}

export const createNewUser = async (req, res) => {
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

        await createAuditLog(req.user ? req.user._id : "system", newCreatedUser._id, "User", "create", "User created"); //Log user creation

        res.status(201).json({success: true, message: "User created successfully", data: newCreatedUser})
    } catch (error) {
        console.log(`Error in creating user: `, error.message);
        return res.status(500).json({success: false, message: `Server Error: ${error.message}`})
    }
}

export const updateUser = async (req, res) => {
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

        await createAuditLog(req.user ? req.user._id : "system", id, `User", "update", "Updated user with changes: ${JSON.stringify(updatedUser)}`);

        res.status(200).json({success: true, message: "User Updated successfully", data: newUpdatedUser,})
    } catch(error) {
        console.log(`Error in fetching user with id ${id}: `, error.message);
        return res.status(500).json({success: false, message: `Server Error: ${error.message}`})
    }
}

export const deleteUser = async (req, res) => {
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

        await createAuditLog(req.user ? req.user._id : "system", deletedUser._id, "User", "delete", "User Deleted"); //Log user deletion

        res.status(200).json({success: true, message: "User Deleted successfully"})
    } catch (error) {
        console.log(`Error in deleting user with id ${id}: ${error.message}`)
        return res.status(500).json({success: false, message: `Server Error: ${error.message}`})
    }
}