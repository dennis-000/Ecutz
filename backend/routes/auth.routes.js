import { Router } from "express";
import { login, logout } from "../controllers/auth.controller.js";

const loginRouter = Router()

//Login and logout routes
loginRouter.post("/login", login)
loginRouter.get("/logout", logout)

export default loginRouter