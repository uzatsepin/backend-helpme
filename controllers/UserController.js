import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import UserModel from '../models/User.js';
import dotenv from 'dotenv'
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

export const register = async (req, res) => {

    try {
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const doc = new UserModel({
            email: req.body.email,
            passwordHash: hash,
            phoneNumber: req.body.phoneNumber,
            town: req.body.town,
            userName: req.body.userName
        })

        const user = await doc.save();

        const token = jwt.sign(
            {
                _id: user._id
            }, 
            SECRET_KEY,
            {
                expiresIn: '30d'
            }
        )

        const { passwordHash, ...userData } = user._doc;

        res.status(201).json({
            token,
            ...userData
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: `Register failed – ${error}` });
    }
}

export const login = async (req, res) => {
    try {

        const user = await UserModel.findOne({ email: req.body.email });

        if (!user) {
            return res.status(404).json({ message: 'Користувача не знайдено' });
        }

        const isPassowrdValid = await bcrypt.compare(req.body.password, user._doc.passwordHash);

        if(!isPassowrdValid) {
            return res.status(404).json({ message: 'Невірний email або пароль' });
        }

        const token = jwt.sign(
            {
                _id: user._id
            }, 
            SECRET_KEY,
            {
                expiresIn: '30d'
            }
        )

        const { passwordHash, ...userData } = user._doc;

        res.status(200).json({
            token,
            ...userData
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: `'Login failed' – ${error}` });
    }
}

export const getUser = async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId);
        if(!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const { passwordHash, ...userData } = user._doc;

        res.status(200).json({
            ...userData
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Data fetching error' });
    }
}

export const getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.find({}, { passwordHash: 0 });
        res.json(users);
    } catch (error) {
        res.status(500).json({
            message: `Не вийшло отримати всіх користувачів ${error}`,
        });
    }
}