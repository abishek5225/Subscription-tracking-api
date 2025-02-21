import mongoose from "mongoose"

export const signUp= async(req, res, next)=>{
    const session = await mongoose.startSession()
    session.startTransaction();

    try{
        

        await session.commitTransaction();
    }catch(error){  //this means if at any point something went wrong then don't do anything and abort the transaction
        await session.abortTransaction()
        session.endSession()
        next(error)
    }
}


export const signIn= async(req, res, next)=>{}


export const signOut= async(req, res, next)=>{}

