import { body } from "express-validator";

export const registerValidator = [
    body('email', 'Некорректный email').isString().isEmail(),
    body('password', 'Мінімальна довжина символів').isString().isLength({min: 5}),
    body('phoneNumber', "Некорректний номер телефону").isMobilePhone('uk-UA'),
    body('userName', "Некоректне ім'я").isString().isLength({min: 3}),
    body('town', "Некоректно ведено місто").isString().isLength({min: 3}),
]

export const loginValidator = [
    body('email', 'Некорректный email').isString().isEmail(),
    body('password', 'Мінімальна довжина символів').isString().isLength({min: 5}),
]