import db from "../config/db.js"
import bcrypt from "bcrypt"
import { v4 as uuidV4 } from "uuid"



export const signIn = async (req, res) => {

    let { email, password } = req.body 


    try {

        const checkUser = await db.collection("usuarios").findOne({ email })

        if (!checkUser) {
            return res.status(400).send("Usuário ou password incorretos!")
        }

        const isCorrectPassword = bcrypt.compareSync(password, checkUser.password) 

        if (!isCorrectPassword) {
            return res.status(400).send("Usuário ou password incorretos!")
        } 

        const token = uuidV4() 

        await db.collection("sessoes").insertOne({idUser: checkUser._id, token})

            return res.send({token, nome: checkUser.nome })
        
    } catch (err) {
        res.status(500).send(err.message)

    }

}


