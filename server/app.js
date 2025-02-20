import express from 'express'
import {PORT} from './config/env.js'
import cookieParser from 'cookie-parser'

//importing routes
import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';
import subscriptionRouter from './routes/subscription.routes.js';

//database
import connectToDatabase from './database/mongodb.js';
import errorMIddleware from './middlewares/error.middleware.js';

const app = express();

//builtin middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false})); // this helps us to process the form data sent via html forms in a simple format
app.use(cookieParser())
//routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);

//errormiddleware
app.use(errorMIddleware)

app.get('/', (req, res) => {
    res.send('welcome to the subscription tracker API');
})

app.listen(PORT ,async () => {
    console.log(`Server is running on http://localhost:${PORT}`);

    await connectToDatabase();
})

export default app;