


export default function validateEntradaSchema(schema) {
    return (req, res, next)=> {
        const {valor, descricao} = req.body
        const {error, value}= schema.validate ({valor, descricao})
        if (error) return res.status(422).send(error.message)  

        res.locals.value = value;
        next();
    }
}