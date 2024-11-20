import mongoose from "mongoose";
import AuditLog from "../models/audit.model.js";

//function or middleware to create an audit log 
export const createAuditLog = async (userId, targetId, targetModel, action, details) => {
    if (!userId || !targetId || !targetModel || !action || !details) {
        console.error("Missing required fields for audit log creation");
        return; // Avoid creating incomplete logs
    }

    try {
        console.log(userId, targetId);
        const logEntry = new AuditLog({
        user: userId,
        target: targetId,
        targetModel: targetModel,
        action: action,
        details: details,
        });
        await logEntry.save();
        console.error("Audit log created successfully");
    } catch (error) {
        console.error("Failed to create audit log:", error);
    }
};

export const getAllAuditLogs = async (req, res) => {
    try {
        // const { page = 1, limit = 10 } = req.query; // Add pagination
        // const skip = (page - 1) * limit;
        // const auditLogs = await AuditLog.find({})
        //     .sort({ timestamp: -1 })
        //     .skip(skip)
        //     .limit(Number(limit));
        
        const auditLogs = await AuditLog.find({}).sort({ timestamp: -1})
        res.status(200).json({success: true, message: "Audit logs fetched successfully", data: auditLogs})
    } catch (error) {
        console.error("Failed to get audit logs:", error);
        return res.status(500).json({ success: false, message: "Failed to fetch Audit Logs", error: error.message })    }
}