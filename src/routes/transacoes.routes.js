import { Router } from "express";
import transacoesValidacao from "../middlewares/transacoesValidacao.js";
import { novaTransacao, listarTransacoes } from "../controllers/transacoes.controller.js";

const router = Router();

router.post("/nova-transacao/:tipo", transacoesValidacao, novaTransacao);
router.get("/home", listarTransacoes);

export default router;