import { Router } from "express";
import brandController from "../controllers/brandController.js";

const router = Router();

router.post('/', brandController.post)
router.get('/', brandController.get)

export default router;