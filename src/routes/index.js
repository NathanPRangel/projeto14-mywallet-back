import express from 'express';
import signUpRouter from './signUpRouter.js';
import signInRouter from './signInRouter.js';
import userDataRouter from './userDataRouter.js';
import transactionsRouter from './transactionsRouter.js';

const router = express.Router();

router.use([signUpRouter, signInRouter, userDataRouter, transactionsRouter]);

export default router;