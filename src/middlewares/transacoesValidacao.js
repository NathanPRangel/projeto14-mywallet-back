import { transacoesSchema } from "../schemas/transacoes.schema.js";

export default async function transacoesValidacao (req, res, next){

    const validation = transacoesSchema.validate(req.body, { abortEarly: false});
    
    if (validation.error) {
        const erros = validation.error.details.map(detail => detail.message);
        return res.status(422).send(erros);
    }

    next()
}