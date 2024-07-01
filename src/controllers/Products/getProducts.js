import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getProducts = {
    async mostrarProduto(req, res) {
        try {
            const { userId } = req.body

            const products = await prisma.produto.findMany({
                where: {
                    userId: userId
                }, select: {
                    name: true,
                    description: true,
                    barcode: true
                }
            })

            if (products.length === 0) {
                return res.status(404).json({ message: "Sem produtos para este usuario" })
            }

            res.send(products)

        } catch (error) {

        }
    }
}