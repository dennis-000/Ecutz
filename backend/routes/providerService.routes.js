import { Router } from "express"
import { createNewProviderService, deleteProviderService, getAllProviderService, getSingleProviderService, updateProviderService } from "../controllers/providerService.controller.js"

const providerServiceRouter = Router()

//Provider Service
providerServiceRouter.get("/", getAllProviderService)
providerServiceRouter.get("/:id", getSingleProviderService)//Get a single provider service
providerServiceRouter.post("/", createNewProviderService)
providerServiceRouter.patch("/:id", updateProviderService)
providerServiceRouter.delete("/:id", deleteProviderService)

export default providerServiceRouter