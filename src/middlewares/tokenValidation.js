import db from "../db.js";

export async function tokenValidation(req, res, next){
	const auth = req.headers.authorization;
	const token = auth?.replace("Bearer ", "");
	if (!token) {
    	return res.sendStatus(401);
	}

	const session = await db.collection("sessions").findOne({token})

	if (!session){
		return res.sendStatus(401)
	}

	const userId = session.userId

	if (!userId) {
		return res.sendStatus(401);
	}
	delete userId.password;

	res.locals.userId = userId;

	next()
}