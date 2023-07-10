import bcrypt from 'bcrypt'
import db from '../db.js'
import joi from 'joi'
import {v4 as uuid} from 'uuid'

export async function postSignIn(req, res){
	try{
		const userSchema = joi.object({
			email: joi.string().email().required(),
			password: joi.string().required()
		})

		const userCredentials = req.body;

		const validation = userSchema.validate(userCredentials, { abortEarly: true })
	
		if (validation.error){
			return res.status(422).send(validation.error.details)
		}

		const {email, password} = userCredentials;
		
		const user = await db.collection("users").findOne({email});

		if(user && bcrypt.compareSync(password, user.password)) {
			const token = uuid();
			
				await db.collection("sessions").insertOne({
					userId: user._id,
					token
				})
	
			res.send(token);
		} else {
			res.status(401).send("Email ou senha incorretos")
		}

	}catch{
		res.sendStatus(500)
	}
}