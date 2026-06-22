import { Router } from "express";
import UserController from "../controllers/userController.js";
import AuthMiddleware from "../controllers/meddleware/AuthMiddleware.js";

const router = Router();

router.post('/registration', UserController.registration)
router.post('/login', UserController.login)
router.get('/auth', AuthMiddleware,  UserController.check)
router.get('/me', AuthMiddleware,  UserController.getUser)
router.put('/', AuthMiddleware, UserController.updateUser)

export default router;