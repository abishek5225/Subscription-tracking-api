import { Router } from "express";

const userRouter = Router();

userRouter.get('/users', (req, res)=>{
    res.send({title : 'GET all users'})
})

userRouter.get('/:id', (req, res)=>{
    res.send({title : 'GET users details'})
})

userRouter.post('/', (req, res)=>{
    res.send({title : 'Create new users'})
})

userRouter.put('/:id', (req, res)=>{
    res.send({title : 'UPDATE users details'})
})

userRouter.delete('/:id', (req, res)=>{
    res.send({title : 'delete users details'})
})

export default userRouter;