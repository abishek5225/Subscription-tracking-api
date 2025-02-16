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
              value <= new Date(),
                "Start date must be in the past";
        }
    },
    renewalDate: {
        type: Date,
        required: [true, "Renewal date is required"],
        validate: (value) => {
         return value >= this.startDate,
                "Renewal date must be in the future";
        }
    },


}, { timestamps: true });