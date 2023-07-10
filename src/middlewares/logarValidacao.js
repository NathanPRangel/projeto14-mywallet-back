import { loginSchema } from "../schemas/usuario.schema.js";
import db from "../app.js";
import bcrypt from "bcrypt";

export default async function logarValidacao (req, res, next){
    const { email, password } = req.body;

    const validation = loginSchema.validate(req.body, { abortEarly: false});
    if (validation.error) {
        const erros = validation.error.details.map(detail => detail.message);
        return res.status(422).send(erros);
    }

    try{
        const usuario = await db.collection('usuarios').findOne({ email: email});

        if(!usuario) return res.status(404).send("E-mail não cadastrado");

       const senha = bcrypt.compareSync(password, usuario.password);

       if(!senha) return res.status(401).send("Senha incorreta");
    } catch (err) {
        res.status(500).send(err.message);
    }

    next()
}