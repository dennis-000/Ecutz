import { Router } from "express"
import { createNewProviderService, deleteProviderService, getAllProviderService, getSingleProviderService, updateProviderService } from "../controllers/providerService.controller.js"
import { requireAuth } from "../middlewares/auth.middleware.js"

const providerServiceRouter = Router()

//Provider Service
providerServiceRouter.get("/", getAllProviderService)
providerServiceRouter.get("/:id", getSingleProviderService)//Get a single provider service
providerServiceRouter.post("/", requireAuth, createNewProviderService)
providerServiceRouter.patch("/:id",requireAuth, updateProviderService)
providerServiceRouter.delete("/:id",requireAuth, deleteProviderService)

export default providerServiceRouter