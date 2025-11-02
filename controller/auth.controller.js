import mongoose from "mongoose"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.model.js";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/env.js";

export const signUp = async (req, res, next)=>{
const session = await mongoose.startSession();
session.startTransaction();
try{
    // Your sign-up logic here
    const { name, email, password } = req.body;
    
    // Debug: Log req.body
    console.log("Request body:", req.body);
    console.log("Extracted values - name:", name, "email:", email, "password:", password);
   
    //Check if user already exists, hash password, save user to DB, etc.
    const existingUser = await User.findOne({ email })
    if(existingUser){
        const error = new Error("User already exists with this email");
        error.status = 409;
        throw error;
    }

    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //Create new user
    const newUser = await User.create([{
        name,
        email,
        password: hashedPassword
    }], { session });

    //Create jwt token
    const token = jwt.sign({userId: newUser[0]._id}, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN});

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
        message: "User registered successfully",
        userId: newUser[0]._id,
        token
    })
}
catch(error){
    next(error);
}
}
export const signIn = async (req, res, next)=>{
try{
 const { email, password } = req.body;

    //Find user by email
    const user = await User.findOne({ email });
    if(!user){
        const error = new Error("Invalid email or password");
        error.status = 401;
        throw error;
    }

    //Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        const error = new Error("Invalid email or password");
        error.status = 401;
        throw error;
    }

    //Create jwt token
    const token = jwt.sign({userId: user._id}, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN});

    res.status(200).json({
        message: "User signed in successfully",
        userId: user._id,
        token
    })

}

catch(error){
    next(error);
}
}
export const signOut = (req, res, next)=>{
    // Placeholder implementation
    res.status(501).json({ message: 'signOut not implemented' });
}