import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        minLength: 4,
        maxLength: 15,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
        lowercase: true,
        match : [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Please fill a valid email address"],      
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minLength: 8,
    }
}, {timestamps: true});

const User = mongoose.model("User", userSchema);

export default User;