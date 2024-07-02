import { accountController } from "../controllers/user/userController.js";
import { Router } from "express";
import { yupMiddleware } from "../middlewares/yupMiddleware.js";
import { createAccountSchema } from "../utils/schemas/createAccountSchema.js";
import { patchUser } from "../controllers/user/patchUserController.js";
import { updateUserSchema } from "../utils/schemas/updateUserSchema.js";
import { updatePasswordSchema } from "../utils/schemas/updatePasswordSchema.js";
import { createProductSchema } from "../utils/schemas/createProductSchema.js";
import { ProductController } from "../controllers/Products/ProductController.js";
import { updateProductSchema } from "../utils/schemas/updateProductSchema.js";
import { patchProduct } from "../controllers/Products/patchProductController.js";

export const router = Router();

router.post("/create", yupMiddleware(createAccountSchema), accountController.create,);
router.post("/login", accountController.login);
router.get("/user", accountController.getAll);
router.patch("/atualizar/:id", yupMiddleware(updateUserSchema), patchUser.atualizarUsuario,);
router.patch("/atualizar-Password/:id", yupMiddleware(updatePasswordSchema), patchUser.atualizarSenha,);
router.delete("/deleteUser/:id", patchUser.delUsr);
router.post("/createProduct", yupMiddleware(createProductSchema), ProductController.createProduct)
router.get("/findProductsByUser/:id", ProductController.mostrarProduto)
router.patch("/updateProduct/:id", yupMiddleware(updateProductSchema), patchProduct.updateProduct)
router.delete("/DeleteProduct/:id", patchProduct.delPro)

export default router;
