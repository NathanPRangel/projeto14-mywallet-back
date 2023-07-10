import express from 'express';
import { deleteTransactions } from '../controllers/deleteTransactions.js';
import { getTransactions } from '../controllers/getTransactions.js';
import { postTransactions } from '../controllers/postTransactions.js';
import { putTransactions } from '../controllers/putTransactions.js';

import { tokenValidation } from '../middlewares/tokenValidation.js'

const transactionsRouter = express.Router();

transactionsRouter.delete('/transactions', tokenValidation, deleteTransactions)
transactionsRouter.get('/transactions', tokenValidation, getTransactions)
transactionsRouter.post('/transactions', tokenValidation, postTransactions)
transactionsRouter.put('/transactions', tokenValidation, putTransactions)

export default transactionsRouter