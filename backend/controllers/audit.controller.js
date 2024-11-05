import mongoose from "mongoose";
import AuditLog from "../models/audit.model.js";

//function or middleware to create an audit log 
export const createAuditLog = async (userId, targetId, targetModel, action, details) => {
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

export const getAllAuditLogs = async (req, res) => {
    try {
        const auditLogs = await AuditLog.find({}).sort({ timesptamp: -1})
        res.status(200).json({success: true, message: auditLogs.length === 0 ? "No audit logs have been added" : "Audit Log fetched successfully", data: auditLogs})
    } catch (error) {
        console.error("Failed to get audit logs:", error);
        return res.status(200).json({success: true, message: "Audit Log fetched successfully", data: auditLogs})    }
}