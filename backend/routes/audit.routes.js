import { Router } from "express";
import { getAllAuditLogs } from "../controllers/audit.controller.js";

const auditRouter = Router()

//Get all audit logs
auditRouter.get("/", getAllAuditLogs)

export default auditRouter