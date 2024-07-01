import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const ProductController = {
    async createProduct(req, res) {
        const { name, description, barcode, userId } = req.body

        const verificarBarCode = await prisma.produto.findFirst({
            where: {
                barcode: barcode
            }
        })

        if (barcode === verificarBarCode?.barcode) {
            return res.status(409).json({ message: "o código de barras já existe" })
        }

        const product = await prisma.produto.create({
            data: {
                userId: userId,
                name: name,
                description: description,
                barcode: barcode
            }
        })
        res.status(201).json({ message: "produto criado com sucesso !" })
    }
}
