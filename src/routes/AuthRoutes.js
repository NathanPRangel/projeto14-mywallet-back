import { Router } from "express";
import { signIn } from "../controllers/sign-in.js";
import { signUp } from "../controllers/sign-up.js";
import { usuarioSchema2 } from "../schemas/signInSchemas.js";
import { usuarioSchema } from "../schemas/signUpSchemas.js";
import validateUsuario from "../middlewares/validateUsuarioSchema.js";


const router = Router()


router.post("/sign-in", validateUsuario(usuarioSchema2), signIn)

router.post("/sign-up", validateUsuario(usuarioSchema), signUp)

export default router

