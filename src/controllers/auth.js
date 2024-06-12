import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const authController = {
    async login(req, res) {
        const { email, password } = req.body

        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
            select: {
                name: true,
                email: true,
                nickName: true,
                password: true
            }
        })
        if (!user) {
            return res.status(401).json({ error: "Email ou senha invalidos" });
        }

        if (email === user.email) {
            return res.status(401).json({ error: "Email já cadastrado" })
        }

        if (password != user.password) {
            return res.status(401).json({ error: "Email ou senha invalidos" })
        }

        res.status(200).json({ message: 'logado !' })
    }
}