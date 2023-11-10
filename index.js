import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { loginValidator, registerValidator, requestValidator } from './helpers/validators.js';
import { getUser, login, register } from './controllers/UserController.js';
import handleValidationError from './middlewares/handleValidationError.js';
import isAuthenificated from './middlewares/isAuthenificated.js';
import { createRequest, deleteOneRequest, getAllRequests, getOneRequest, updateRequest } from './controllers/RequestController.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8888;
const MONGO_URL = process.env.MONGO_URL;

mongoose.connect(MONGO_URL).then(() => {
    console.log('Database connected successfully');
}).catch((error) => {
    console.error('Database connection error', error.message);
});

//Auth
app.post("/register", registerValidator, handleValidationError, register)
app.post("/login", loginValidator, handleValidationError, login)
app.get("/user", isAuthenificated, getUser)


//Requests
app.get('/requests', getAllRequests)
app.post("/create", isAuthenificated, requestValidator, createRequest)
app.get('/requests/:id', getOneRequest)
app.delete('/requests/:id', isAuthenificated, deleteOneRequest)
app.patch('/requests/:id', isAuthenificated, updateRequest)


app.listen(PORT, (error) => {
    if(error) {
        console.log(error);
    }
    console.log(`Server is running on port ${PORT}`);
})