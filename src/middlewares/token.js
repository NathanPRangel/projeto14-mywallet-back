import db from "../config/db.js"

 



export default function validToken () {
    
    return async (req, res, next) => {
        
        const { authorization } = req.headers

        const token = authorization?.replace("Bearer ", '')

        if (!token) return res.status(422).send("Por favor, informe o token!")
        try{
        const checkUser = await db.collection("sessoes").findOne({ token })
 
  
        if (!checkUser) return res.status(401).send("Você não possui autorização!")

        res.locals.id= checkUser._id;
         next ();
        }catch (err){
        console.log(err)
        res.status(500).send("Servidor não conectado")
        }
       

    }


 } 