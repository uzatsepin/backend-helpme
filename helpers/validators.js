import { body } from "express-validator";

export const registerValidator = [
    body('email', 'Некорректный email').isString().isEmail(),
    body('password', 'Мінімальна довжина символів').isString().isLength({min: 5}),
    body('phoneNumber', "Некорректний номер телефону").isMobilePhone('uk-UA')
]

export const loginValidator = [
    body('email', 'Некорректный email').isString().isEmail(),
    body('password', 'Мінімальна довжина символів').isString().isLength({min: 5}),
]