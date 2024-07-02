import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const patchProduct = {
    async updateProduct(req, res) {
        try {
            const { id } = req.params
            const { name, description, barcode, price } = req.body

            const update = await prisma.produto.update({
                where: {
                    id: Number(id)
                }, data: {
                    name: name,
                    description: description,
                    barcode: barcode,
                    price: price
                }
            })

            res.status(200).json({ message: "produto atualizado com sucesso" })
        } catch (error) {
            console.log(error)

        }
    }
}