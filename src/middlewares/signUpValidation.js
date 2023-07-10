import joi from "joi";

export async function signUpValidation(req,res,next){
	try{

		const userSchema = joi.object({
			username: joi.string().required(),
			email: joi.string().email().required(),
			password: joi.string().required(),
		})
		
		const userCredentials = req.body;
		
		const validation = userSchema.validate(userCredentials, { abortEarly: true })
		
		if (validation.error){
			return res.status(422).send(validation.error.details)
		}

		next()

	}	catch	{
		res.sendStatus(500)
	}
}
