import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Subscription name is required"],
        trim: true,
        minLength: [3, "Subscription name must be at least 3 characters long"],
        maxLength: [50, "Subscription name must not exceed 50 characters"]
    },
    price:{
        type: Number,
        required: [true, "Subscription price is required"],
        min: [0, "Subscription price must be at least 0"]
    },

    currency:{
        type: String,
        enum: ["USD", "EUR", "GBP", "INR"],
        default: "USD"
    },

    frequency:{
        type: String,
        enum: ["daily", "weekly", "monthly", "yearly"],
    },

    category:{
        type: String,
        enum: ["entertainment", "productivity", "education", "health", "other", "social", "news", "sports"],
        required: [true, "Subscription category is required"]
    },

    paymentMethod:{
        type: String,
        required: [true, "Payment method is required"],
        trim: true
    },
 
    status:{
        type: String,
        enum: ["active", "canceled", "expired"],
        default: "active"
    },

    startDate:{
        type: Date,
        required: [true, "Subscription start date is required"],
        validate: {
            validator: (value)=> value <= new Date(),
            message: "Start date cannot be in the future"
        }

    },
    renewalDate:{
        type: Date,
        validate: {
            validator: function(value){ return value >= this.startDate},
            message: "Renewal date cannot be in the past"
        }

    },

    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Subscription must be associated with a user"],
        index: true
    }

}, { timestamps: true })


subscriptionSchema.pre("save", function(next){
 if(!this.renewalDate){
    let renewal = new Date(this.startDate);
    switch(this.frequency){
        case "daily":
            renewal.setDate(renewal.getDate() + 1);
            break;
        case "weekly":
            renewal.setDate(renewal.getDate() + 7);     
            break;
        case "monthly":
            renewal.setMonth(renewal.getMonth() + 1);
            break;
        case "yearly":
            renewal.setFullYear(renewal.getFullYear() + 1);
            break;
    }
    this.renewalDate = renewal;
 }

 if(this.renewalDate < new Date()){
    this.status = "expired";
 }
 next();
})


const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;