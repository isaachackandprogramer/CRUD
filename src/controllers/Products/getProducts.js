import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getProducts = {
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