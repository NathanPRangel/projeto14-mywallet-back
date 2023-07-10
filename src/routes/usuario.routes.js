import { Router } from "express";
import { Cadastrar, Logar } from "../controllers/usuario.controller.js";
import cadastrarValidacao from "../middlewares/cadastrarValidacao.js";
import logarValidacao from "../middlewares/logarValidacao.js";

const router = Router();

router.post("/cadastro", cadastrarValidacao, Cadastrar);
router.post("/", logarValidacao, Logar);

export default router;