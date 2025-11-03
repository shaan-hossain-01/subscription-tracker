import aj from '../config/arcjet.js';

const arcjetMiddleware = async (req, res, next) => {
    try{
        const decision = await aj.protect(req);

        if(decision.isDenied){
            if(decision.reason.isRateLimit()) return res.status(429).json({message: "Too many requests. Please try again later."});
            if(decision.reason.isBot()) return res.status(403).json({message: "Access denied. Bot traffic is not allowed."});
            return res.status(403).json({message: "Access denied."});
        }
        
        next();
    }
    catch (error) {
        console.log(`Error in Arcjet middleware: ${error.message}`);
    }
}

export default arcjetMiddleware;