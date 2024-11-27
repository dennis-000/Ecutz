import { Router } from "express";
import { requireAuth } from "../middlewares/auth.middleware.js";
import { deleteRating, getSingleUserRatings, rateAppointment } from "../controllers/rating.controller.js";

const ratingRouter = Router()

//Review
// ratingRouter.get("/", getAllRatings)
ratingRouter.get("/user/:id", getSingleUserRatings)//Get all Ratings of a particular user
ratingRouter.patch("/:appointment_id", requireAuth, rateAppointment)
ratingRouter.delete("/:appointment_id",requireAuth, deleteRating)

export default ratingRouter