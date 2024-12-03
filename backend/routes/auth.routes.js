import { Router } from "express";
import { forgotPasswordController, login, logout, resetPasswordController } from "../controllers/auth.controller.js";

const loginRouter = Router()

//Login and logout routes
loginRouter.post("/login", login)
loginRouter.get("/logout", logout)
loginRouter.post("/auth/forgot-password", forgotPasswordController)
loginRouter.post("/auth/forgot-password/:token", resetPasswordController)

export default loginRouter