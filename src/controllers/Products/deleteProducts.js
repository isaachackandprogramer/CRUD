import { PrismaClient } from "@prisma/client";
import { number } from "yup";

const prisma = new PrismaClient()

export const deleteProducts = {
    async delPro(req, res) {
        try {
            const { id } = req.params
            const product = await prisma.produto.findUnique({
                where: {
                    id: Number(id)
                },
            })

            if (!product) {
                return res.status(404).json({ message: "produto não encontrado" })
            }

            const delPro = await prisma.produto.delete({
                where: {
                    id: Number(id)
                }, select: {
                    name: true,
                    barcode: true,
                    description: true,
                    price: true
                }
            })

            res.status(200).json({ message: "produto deletado" })

        } catch (error) {

        }
    }
}