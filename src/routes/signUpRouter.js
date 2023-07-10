import express from 'express';
import { signUpValidation } from '../middlewares/signUpValidation.js';
import { postSignUp } from '../controllers/postSignUp.js';

const signUpRouter = express.Router();

signUpRouter.post('/signup',signUpValidation, postSignUp)

export default signUpRouter