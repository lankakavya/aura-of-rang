import User from "../models/Users.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { verifyGmailDomain } from "../Middlewares/googleAuth.js";


export async function RegisterUser(req, res) {
    try {
        const { name, email, password } = req.body;

        // Validate Gmail domain
        if (!verifyGmailDomain(email)) {
            return res.status(400).json({
                msg: "Only official Gmail accounts (@gmail.com) are allowed"
            });
        }
        
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: "User already exists" });
        }
        if(!name || !email || !password){
            return res.status(400).json({ msg: "Please fill all the fields" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            isEmailVerified: true
        });
        
        res.status(201).json({
            msg: "Registration successful!",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        res.status(500).json({
            msg: "Internal server failure",
            message: error.message
        });
    }
}


export async function Login(req,res) {
try{
    const {email,password} = req.body
    const user = await User.findOne({email})
    if (!user){
        return res.status(404).json({msg : "user not Found"})
    }
    if (user && (await bcrypt.compare(password, user.password))){
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET || process.env.your_secret_key,
            { expiresIn: "1h" }
        );
        res.status(200).json({
            msg: "Login Successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        })
    } else {
        res.status(401).json({msg : "Invalid password"})
    }
}  
catch(error){
    res.status(500).json({
        msg: "Internal server failure",
        message: error.message
      }); 
}
}