import joi from "joi";

export const cadastroSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().required(),
    password: joi.string().min(3).required()
});

export const loginSchema = joi.object({
    email: joi.string().required(),
    password: joi.string().min(3).required()
});
