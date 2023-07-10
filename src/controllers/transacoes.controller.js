import dayjs from "dayjs";
import db from "../app.js";

export async function novaTransacao (req, res) {
    const { authorization} = req.headers;
    const transacao = req.body;
    const tipo = req.params.tipo;

    const token = authorization?.replace("Bearer ", "");
    const tokenExiste = await db.collection('logados').findOne({token: token})
    if (!token || !tokenExiste) return res.sendStatus(401);


    try{
        const usuario = await db.collection('usuarios').findOne({_id: tokenExiste.usuario})
        await db.collection('carteira').insertOne({
            email: usuario.email,
            value: transacao.value,
            type: tipo,
            date: dayjs().format("DD/MM"),
            description: transacao.description
        })

        res.sendStatus(201);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function listarTransacoes (req, res) {
    const { authorization } = req.headers;

    const token = authorization?.replace("Bearer ", "");
    const tokenExiste = await db.collection('logados').findOne({token: token})

    if(!tokenExiste) return res.sendStatus(401);
    const usuario = await db.collection('usuarios').findOne({_id: tokenExiste.usuario})

    if (!usuario || !token) return res.sendStatus(401);

    try {
        const transacoes = await db.collection('carteira').find( {email: usuario.email} ).toArray();
        res.status(200).send(transacoes.reverse());
    } catch (err) {
        res.status(500).send(err.message);
    }
}