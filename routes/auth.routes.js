import { Router } from "express";

const authRouter = Router();

authRouter.post('/sign-in', (req, res)=>{
    res.send('Sign In Endpoint');
})

authRouter.post('/sign-out', (req, res)=>{
    res.send('Sign Out Endpoint');
})
authRouter.post('/sign-up', (req, res)=>{
    res.send('Sign Up Endpoint');
})

export default authRouter;