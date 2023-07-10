import { Router } from "express"
import { getEntrada , saida} from "../controllers/postTransaction.js"
import { entrada } from "../controllers/postTransaction.js"
import validateSchema from "../middlewares/validateSchema.js"
import { entradaSchema } from "../schemas/entradaSchema.js"
import validToken from "../middlewares/token.js"



const transactionRouter = Router();


transactionRouter.get("/home", getEntrada)

transactionRouter.post("/entrada", validToken(), validateSchema(entradaSchema), entrada)

transactionRouter.post("/saida", validToken(), validateSchema(entradaSchema), saida)


export default transactionRouter