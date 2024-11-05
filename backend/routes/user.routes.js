import { Router } from 'express'
import { createNewUser, deleteUser, getAllCustomers, getAllProviders, getAllUsers, getSingleUserById, updateUser } from '../controllers/user.controller.js'
import upload from '../config/upload.config.js'

const userRouter = Router()

//Users
userRouter.get("/", getAllUsers)
userRouter.get("/providers", getAllProviders)//Get all providers
userRouter.get("/customers", getAllCustomers)//Get all customers
userRouter.get("/:id", getSingleUserById)//Get a single user
userRouter.post("/", upload.single("profilePicture"), createNewUser)
userRouter.patch("/:id", upload.single("profilePicture"), updateUser)
userRouter.delete("/:id", deleteUser)

export default userRouter