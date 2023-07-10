import { cadastroSchema } from "../schemas/usuario.schema.js";
import db from "../app.js";

export default async function cadastrarValidacao (req, res, next){
    const { email } = req.body;

    const validation = cadastroSchema.validate(req.body, { abortEarly: false});
    if (validation.error) {
        const erros = validation.error.details.map(detail => detail.message);
        return res.status(422).send(erros);
    }

    try{
        const usuario = await db.collection('usuarios').findOne({ email: email});

        if(usuario) return res.status(409).send("Já existe um usuário com esse e-mail!");
    } catch (err) {
        res.status(500).send(err.message);
    }

    next()
}