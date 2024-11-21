import mongoose from "mongoose";

const AuditLogSchema = new mongoose.Schema({
  action: { type: String, required: true }, // e.g., "create", "update", "delete"
  user: { type: mongoose.Schema.Types.Mixed, ref: "User", required: true }, // who performed the action
  target: { type: mongoose.Schema.Types.ObjectId, required: true }, // e.g., service, appointment, user
  targetModel: { type: String, required: true }, // the type of the target (e.g., "Service", "Appointment")
  timestamp: { type: Date, default: Date.now },
  details: { type: String }, // additional details, e.g., fields changed, previous values
});

const AuditLog = mongoose.model("AuditLog", AuditLogSchema);
export default AuditLog;