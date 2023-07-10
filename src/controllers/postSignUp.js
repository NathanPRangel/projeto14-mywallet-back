import bcrypt from 'bcrypt'
import db from '../db.js'
import { stripHtml } from 'string-strip-html'

export async function postSignUp(req, res){
	try {
		const userCredentials = req.body;
	
		userCredentials.username = stripHtml(userCredentials.username).result.trim();
		userCredentials.email = stripHtml(userCredentials.email).result.trim();
		userCredentials.password = bcrypt.hashSync(userCredentials.password, 10)
	
		const usernameAlreadyExists = await db.collection("users").findOne({username: userCredentials.username})
	
		const emailAlreadyExists = await db.collection("users").findOne({email: userCredentials.email})
	
		if (!usernameAlreadyExists && !emailAlreadyExists){
	
			await db.collection("users").insertOne(userCredentials)
	
			return res.status(201).send(await db.collection("users").find().toArray())
		}else{
			return res.status(409).send("Usuário ou e-mail já cadastrados")
		}
	} catch {
		res.sendStatus(500)
	}
}