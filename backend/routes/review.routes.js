import { Router } from "express";
import { createNewReview, deleteReview, getAllReviews, getSingleUserReviews, updateReview } from "../controllers/review.controller.js";

const reviewRouter = Router()

//Review
reviewRouter.get("/", getAllReviews)
reviewRouter.get("/user/:id", getSingleUserReviews)//Get all reviews of a particular user
reviewRouter.post("/", createNewReview)
reviewRouter.patch("/:id", updateReview)
reviewRouter.delete("/:id", deleteReview)

export default reviewRouter