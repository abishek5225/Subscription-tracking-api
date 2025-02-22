import mongoose from "mongoose"
import bcrypt from 'bcryptjs'


import User from '../models/user.model.js'

export const signUp= async(req, res, next)=>{
    const session = await mongoose.startSession()
    session.startTransaction();//using this because we want to perform some atomic updates

    try{
      const { name, email, password } = req.body;

      //check if user already exists
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        const error = new Error("User already exists");
        error.statusCode(409);
        throw error;
      }

      //Hash password with bcrypt
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      //create a new user
      const newUser = await User.create(
        [{ name, email, password: hashedPassword }],
        { session }
      );

      await session.commitTransaction();
    }catch(error){  //this means if at any point something went wrong then don't do anything and abort the transaction
        await session.abortTransaction()
        session.endSession()
        next(error)
    }
}


export const signIn= async(req, res, next)=>{}


export const signOut= async(req, res, next)=>{}

