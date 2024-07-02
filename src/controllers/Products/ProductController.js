import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const ProductController = {
    async createProduct(req, res) {
        const { name, description, barcode, userId, price } = req.body

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
                barcode: barcode,
                price: price
            }
        })
        res.status(201).json({ message: "produto criado com sucesso !" })
    },

    async mostrarProduto(req, res) {
        try {
            const { id } = req.params
            const { price } = req.query

            const products = await prisma.produto.findMany({
                where: {
                    userId: Number(id),
                    price: {
                        gte: Number(price)
                    }
                }, select: {
                    name: true,
                    description: true,
                    barcode: true,
                    price: true
                }, orderBy: {
                    price: "asc"
                }
            })

            if (products.length === 0) {
                return res.status(404).json({ message: "Sem produtos para este usuario" })
            }

            res.send(products)

        } catch (error) {
            console.log(error)
            res.status(400).json({ message: `error: ${error}` })
        }
    }
}
