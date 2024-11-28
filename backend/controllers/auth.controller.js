import User from "../models/user.model.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { createAuditLog } from "./audit.controller.js";



//Generate jwt
const createToken = (id) => {
    const JWT_SECRET = process.env.JWT_SECRET
    console.log('JWT_SECRET:', process.env.JWT_SECRET); // Should print the secret key if loaded correctly
    if (!JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in the environment variables");
    }
    return jwt.sign({ id }, JWT_SECRET, { expiresIn: '1d' })
}

export const login = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    try {
        const user = await User.findOne({ email })

        if(!user){
            return res.status(401).json({success: false, message: "Invalid email or password"})
        }
        
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(401).json({success: false, message: "Invalid email or password"})
        }

        const token = createToken(user._id)
        res.cookie('jwt', token, { httpOnly: true, secure: true, maxAge: 24 * 60 * 60 * 1000 })
        console.log(`User ${ email } logged in successfully`);
        res.status(200).json({ success: true, message: 'Login successfully', token , data: user })
    } catch (error) {
        console.log(`Server Error: ${ error.message }`);
        return res.status(500).json({ success: false, message: `Server Error: ${error.message}` })
    }
}

export const logout = async (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 }); // Clears the JWT cookie
    res.status(200).json({ success: true, message: 'Logged out successfully' });
}