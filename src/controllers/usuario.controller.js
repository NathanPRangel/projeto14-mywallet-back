import bcrypt from "bcrypt";
import db from "../app.js";
import { v4 as uuid } from "uuid";

export async function Cadastrar (req, res){
    const { name, email, password } = req.body;
    const hash = bcrypt.hashSync(password, 10);

    try{
        await db.collection('usuarios').insertOne({ name, email, password: hash });
        res.sendStatus(201);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

export async function Logar (req, res){
    const token = uuid();
    const { email } = req.body;

    try{
        const usuario = await db.collection('usuarios').findOne({ email: email});

        await db.collection('logados').insertOne({ token: token, usuario: usuario._id});
        const user = {token, usuario: usuario.name} 
        res.status(200).send(user);
    } catch (err){
        res.status(500).send(err.message);
    }
};
