import express from "express"
import cors from "cors"
import AuthRoutes from "./routes/AuthRoutes.js"
import transactionRouter from "../src/routes/Transactions.js"





const app = express()

app.use(cors())

app.use(express.json())
app.use(transactionRouter)
app.use(AuthRoutes)


const port = 5000
app.listen(port, () => console.log("foi maneiro"))


export default app






  

    











