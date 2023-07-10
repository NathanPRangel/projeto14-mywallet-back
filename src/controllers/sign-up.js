import db from "../config/db.js"
import bcrypt from "bcrypt"



  export const signUp = async (req, res) => {

    const { nome , email, password} = req.body



    const passwordHashed = bcrypt.hashSync(password, 10)

    try {
      await db.collection("usuarios").insertOne({nome, email, password: passwordHashed})
      res.status(201).send("Usuario cadastrado!")  


    } catch (err) {
      res.status(500).send(err.message)

    }

  }