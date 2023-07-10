import joi from 'joi'
import db from '../db.js'
import { ObjectID } from 'bson'

export async function getTransactions(req, res){
	const userId = res.locals.userId
	const transactions = await db.collection("transactions").find({userId: ObjectID(userId)}).toArray()

	let balance = 0.0;
	let balanceType = '';

	for (let i = 0; i < transactions.length; i++) {
		if (transactions[i].type==='received'){
			balance+=Number(transactions[i].ammount)
		}else{
			balance-=Number(transactions[i].ammount)
		}	
	}

	if (balance < 0){
		balance = balance * (-1)
		balanceType = 'spent'
	}else{
		balanceType = 'received'
	}

	balance = balance.toFixed(2)

	res.status(200).send({transactions, balance, balanceType})
}