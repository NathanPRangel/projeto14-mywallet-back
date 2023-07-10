import joi from 'joi'
import db from '../db.js'
import { ObjectID } from 'bson'

export async function getUserData(req, res){
	const userId = res.locals.userId

	// console.log(await db.collection("users").find().toArray())

	// console.log(userId)

	const userData = await db.collection("users").findOne({_id: ObjectID(userId)})

	delete userData.password

	res.status(200).send(userData)
}
