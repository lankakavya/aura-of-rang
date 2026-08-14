import User from "../models/Users.js";
import bcrypt from "bcryptjs";

export async function RegisterUser(req, res) {
  try {
    const { name, email, password } = req.body;

    const ExistUser = await User.findOne({ email });

    if (ExistUser) {
      return res.status(401).json({
        msg: "User already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    res.status(201).json({
      msg: "User registered successfully",
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
    const User = await User.findOne({email})
    if (!User){
        res.status(404).json({msg : "user not Found"})
    }

}    
}