import { accountController } from "../controllers/account.js";
import { authController } from "../controllers/auth.js";
import { Router } from 'express';

export const router = Router()

router.post("/create", accountController.create)
router.post("/login", authController.login)

export default router