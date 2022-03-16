import express from 'express';
import dotenv from 'dotenv';
import connectDB from "./config/db.js";
import cors from 'cors'
import {notFound, errorHandler} from "./middleware/errorMiddleware.js";

import languageRoutes from './routes/languageRoutes.js';
import topicRoutes from './routes/topicRoutes.js';
import problemRoutes from "./routes/problemRoutes.js";
import userRoutes from './routes/usersRoutes.js';
import submissionRoutes from './routes/submissionRoutes.js'

dotenv.config();
await connectDB()

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));



//Application Routes
app.use('/api/languages', languageRoutes);
app.use('/api/topic', topicRoutes);
app.use('/api/problem', problemRoutes);
app.use('/api/user', userRoutes);
app.use('/api/submission',submissionRoutes);

//errorFindingMiddleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`))

