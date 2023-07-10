import joi from "joi"




export const usuarioSchema = joi.object({
    nome: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    confirmPassword: joi.string().valid(joi.ref('password')).required()
  });