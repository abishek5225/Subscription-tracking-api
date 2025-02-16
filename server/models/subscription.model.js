import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Subscription is required"],
        trim: true,
        minLength: 4,
        maxLength: 15,
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
        trim: true,
        min: [0, "Price must be greater than 0"],
    },
    currency:{
        type:String,
        enum: ['USD', 'EUR', 'NPR'],
        default: 'USD',
    },

    frequency:{
        type: String,
        enum: ['daily', 'weekly', 'monthly', 'yearly'],
        default: 'monthly',
    },
    category: {
        type: String,
        enum: ['food', 'clothing', 'rent', 'entertainment', 'other'],
        required: [true, "Category is required"],
    },
    paymentMethod: {
        type: String,
        enum: ['esewa', 'khalti', 'MobileBanking', 'cash'],
        required: [true, "Payment method is required"],
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
    },
    startDate: {
        type: Date,
        required: [true, "Start date is required"],
        validate: (value) => {
          validator: value <= new Date(),
                "Start date must be in the past";
        }
    },
    renewalDate: {
        type: Date,
        required: [true, "Renewal date is required"],
        validate: (value) => {
         return value >= this.startDate,
                "Renewal date must be in the future";
        },
        message: "Renewal date must be in the future",
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
    },


}, { timestamps: true });

//Auto calculate renewal date if missing
subscriptionSchema.pre('save', function(next){
    if(!this.renewalDate){
        const renewalPeriods = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365,
        };
        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);  
    }
    if(this.renewalDate < new Date()){
        this.status = 'inactive';
    }

    next();
})