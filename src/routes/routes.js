import { accountController } from "../controllers/account.js";
import { authController } from "../controllers/auth.js";
import { Router } from 'express';
import { yupMiddleware } from "../middlewares/yupMiddleware.js";
import { createAccountSchema } from "../utils/schemas/createAccountSchema.js";
import { getUser } from "../controllers/getUser.js";
import { patchUser } from "../controllers/patchUser.js";
import { updateUserSchema } from "../utils/schemas/updateUserSchema.js";

export const router = Router()

router.post("/create", yupMiddleware(createAccountSchema), accountController.create)
router.post("/login", authController.login)
router.get("/user", getUser.mostrarUser)
router.patch("/atualizar/:id", yupMiddleware(updateUserSchema), patchUser.atualizarUsuario)


export default router