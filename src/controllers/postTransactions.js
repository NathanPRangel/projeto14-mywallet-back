import joi from 'joi'
import db from '../db.js'
import dayjs from 'dayjs'

export async function postTransactions(req, res){
	try {
		const transactionSchema = joi.object({
			ammount: joi.number().required(),
			type: joi.string().required(),
			note: joi.string().required()
		})

		const userId = res.locals.userId

		const transaction = req.body

		const date = `${
			dayjs().date()<9?
			'0'+String(dayjs().date()):
			dayjs().date()
		}/${
			dayjs().month()<9?
			'0'+String(dayjs().month()+1):
			dayjs().month()+1
		}`

		const validation = transactionSchema.validate(transaction, { abortEarly: true })

		if (validation.error){
			return res.status(422).send(validation.error.details)
		}

		if (transaction.type !== "received" && transaction.type !== "spent"){
			return res.status(422).send("Invalid type. Must be 'received' or 'spent'")
		}

		transaction.ammount = Number(transaction.ammount).toFixed(2)

		const fullTransaction = {...transaction, userId, date}

		await db.collection("transactions").insertOne(fullTransaction)

		res.sendStatus(201)

	} catch {
		res.sendStatus(500)
	}
}