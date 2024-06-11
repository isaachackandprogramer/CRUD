import { authController } from "../controllers/auth.js";
import { Router } from 'express';

const router = Router()

router.post("/create", authController.create)

export default router