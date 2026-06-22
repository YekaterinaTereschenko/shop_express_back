import { Router } from "express";
import basketController from "../controllers/basketController.js";
import AuthMiddleware from "../controllers/meddleware/AuthMiddleware.js";

const router = Router();

router.get('/', AuthMiddleware, basketController.get)
router.post('/', AuthMiddleware, basketController.post)
router.delete('/:id', AuthMiddleware, basketController.delete)

export default router;