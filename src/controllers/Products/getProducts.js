import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getProducts = {
    async mostrarProduto(req, res) {
        try {
            const { id } = req.params

            const products = await prisma.produto.findMany({
                where: {
                    userId: Number(id)
                }, select: {
                    name: true,
                    description: true,
                    barcode: true,
                    price: true
                }, orderBy: {
                    price: "desc"
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