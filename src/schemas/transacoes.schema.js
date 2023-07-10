import joi from "joi";

export const transacoesSchema = joi.object({
    value: joi.string().required(),
    description: joi.string().required()
});