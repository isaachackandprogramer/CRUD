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

    },

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
    },

    async delUsr(req, res) {
        try {
            const { id } = req.params;
            const { password } = req.body;

            const user = await prisma.user.findUnique({
                where: {
                    id: Number(id),
                },
                select: {
                    password: true,
                },
            });

            if (!user) {
                return res.status(404).json({ message: "Usuário não encontrado" });
            }

            if (user.deleted) {
                return res.status(400).json({ message: "usuario já deletado" });
            }

            const verificaSenha = await bcrypt.compare(password, user.password);

            if (!verificaSenha) {
                return res.status(401).json({ message: "Senha incorreta" });
            }

            const delUser = await prisma.user.update({
                where: {
                    id: Number(id),
                },
                data: {
                    deleted: true,
                },
            });

            res.status(200).json({ message: "usuario deletado com sucesso" });
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: `houve um erro: ${err}` });
        }
    },
}

export { patchUser }
