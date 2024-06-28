import bcrypt from 'bcrypt'
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const patchPassword = {
    async atualizarSenha(req, res) {
        try {
            const { id } = req.params
            const { password, newpassword } = req.body

            const passwordHash = await bcrypt.hash(password, 12)

            const user = await prisma.user.findUnique({
                where: {
                    id: Number(id)
                },
                select: {
                    password: true,
                }
            })

            const verificaSenha = await bcrypt.compare(password, user.password)

            if (!verificaSenha) {
                return res.status(401).json({ message: "Senha incorreta" })
            }

            const newPasswordHash = await bcrypt.hash(newpassword, 12)

            await prisma.user.update({
                where: {
                    id: Number(id)
                },
                data: {
                    password: newPasswordHash
                }
            })

            res.status(200).json({ message: "Senha atualizada com sucesso" })

        } catch (err) {
            console.log(err)
            res.status(500).json({ message: `houve um erro: ${err}` })
        }
    }
}

export { patchPassword } 