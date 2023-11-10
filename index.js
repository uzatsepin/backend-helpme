import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { loginValidator, registerValidator } from './helpers/validators.js';
import { getUser, login, register } from './controllers/UserController.js';
import handleValidationError from './middlewares/handleValidationError.js';
import isAuthenificated from './middlewares/isAuthenificated.js';

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

app.post("/register", registerValidator, handleValidationError, register)
app.post("/login", loginValidator, handleValidationError, login)
app.get("/user", isAuthenificated, getUser)

app.listen(PORT, (error) => {
    if(error) {
        console.log(error);
    }
    console.log(`Server is running on port ${PORT}`);
})