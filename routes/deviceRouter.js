import { Router } from "express";
import deviceController from "../controllers/deviceController.js";

const router = Router();

router.post('/', deviceController.post)
router.get('/', deviceController.get)
router.get('/:id', deviceController.getById)

export default router;