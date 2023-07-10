import express from 'express';
import { getUserData } from '../controllers/getUserData.js';
import { tokenValidation } from '../middlewares/tokenValidation.js'

const userDataRouter = express.Router();

userDataRouter.get('/userdata', tokenValidation, getUserData)

export default userDataRouter