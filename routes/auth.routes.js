import { Router } from "express";
import { signIn , signOut, signUp} from "../controller/auth.controller.js";


const authRouter = Router();

//Path: /api/v1/auth 
authRouter.post('/sign-in', signIn)
authRouter.post('/sign-out', signOut)
authRouter.post('/sign-up', signUp)

export default authRouter;