import { Router } from "express";
import typeController from "../controllers/typeController.js";
import CheckRoleMiddleWare from "../controllers/meddleware/CheckRoleMiddleWare.js";

const router = Router();

router.post('/', CheckRoleMiddleWare('ADMIN'), typeController.post)
router.get('/', typeController.get)

export default router;