import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const patchUser = {
    async atualizarUsuario(req, res) {
        try {
            const { id } = req.params
            const { email, nickName, name } = req.body;

            const update = await prisma.user.update({
                where: {
                    id: Number(id)
                },
                data: {
                    name: name,
                    email: email,
                    nickName: nickName,
                }
            })
            res.status(200).json({ message: "usuario modificado com sucesso" })
        } catch (err) {
            console.log(err)
        }

    }
}

export { patchUser }
