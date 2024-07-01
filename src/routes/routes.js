import { accountController } from "../controllers/user/account.js";
import { authController } from "../controllers/user/auth.js";
import { Router } from "express";
import { yupMiddleware } from "../middlewares/yupMiddleware.js";
import { createAccountSchema } from "../utils/schemas/createAccountSchema.js";
import { getUser } from "../controllers/user/getUser.js";
import { patchUser } from "../controllers/user/patchUser.js";
import { updateUserSchema } from "../utils/schemas/updateUserSchema.js";
import { updatePasswordSchema } from "../utils/schemas/updatePasswordSchema.js";
import { patchPassword } from "../controllers/user/patchPassword.js";
import { deleteUser } from "../controllers/user/deleteUser.js";
import { createProductSchema } from "../utils/schemas/createProductSchema.js";
import { ProductController } from "../controllers/Products/createProduct.js";
import { getProducts } from "../controllers/Products/getProducts.js";
import { getProductsSchema } from "../utils/schemas/getProductsSchema.js";
import { updateProductSchema } from "../utils/schemas/updateProductSchema.js";
import { patchProduct } from "../controllers/Products/patchProduct.js";

export const router = Router();

router.post("/create", yupMiddleware(createAccountSchema), accountController.create,);
router.post("/login", authController.login);
router.get("/user", getUser.mostrarUser);
router.patch("/atualizar/:id", yupMiddleware(updateUserSchema), patchUser.atualizarUsuario,);
router.patch("/atualizar-Password/:id", yupMiddleware(updatePasswordSchema), patchPassword.atualizarSenha,);
router.delete("/deleteUser/:id", deleteUser.delUsr);
router.post("/createProduct", yupMiddleware(createProductSchema), ProductController.createProduct)
router.post("/findProductsByUser", yupMiddleware(getProductsSchema), getProducts.mostrarProduto)
router.patch("/updateProduct/:id", yupMiddleware(updateProductSchema), patchProduct.updateProduct)

export default router;
