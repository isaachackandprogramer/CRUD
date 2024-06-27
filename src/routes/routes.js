import { accountController } from "../controllers/account.js";
import { authController } from "../controllers/auth.js";
import { Router } from 'express';
import { yupMiddleware } from "../middlewares/yupMiddleware.js";
import { createAccountSchema } from "../utils/schemas/createAccountSchema.js";

export const router = Router()

router.post("/create", yupMiddleware(createAccountSchema), accountController.create)
router.post("/login", authController.login)

export default router