import joi from "joi"




export const usuarioSchema2 = joi.object({
    
    email: joi.string().email().required(),
    password: joi.string().required(),
    
  });