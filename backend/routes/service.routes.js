import { Router } from "express";
import { createNewService, deleteService, getAllServices, getSingleService, updateService } from "../controllers/service.controller.js";

const serviceRouter = Router()

//Service
serviceRouter.get("/", getAllServices)
serviceRouter.get("/:id", getSingleService)//Get a single service
serviceRouter.post("/", createNewService)
serviceRouter.patch("/:id", updateService)
serviceRouter.delete("/:id", deleteService)

export default serviceRouter
