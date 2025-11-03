import { Router } from "express";
import { getUser, getUsers } from "../controller/user.controller.js";
import { authorize } from "../middlewares/auth.middleware.js";


const userRouter = Router();

userRouter.get("/", getUsers)
userRouter.get("/:id", authorize ,getUser)
userRouter.post("/", (req,res)=>{
    res.send("Create a new user");
})
userRouter.put("/:id", (req,res)=>{
    res.send(`Update user with ID: ${req.params.id}`);
})
userRouter.delete("/:id", (req,res)=>{
    res.send(`Delete user with ID: ${req.params.id}`);
})

export default userRouter;