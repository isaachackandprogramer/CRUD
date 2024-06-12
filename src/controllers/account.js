import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const accountController = {
  async create(req, res) {
    const { email, password, nickName, name } = req.body;

    const verificarNick = await prisma.user.findUnique({
      where: {
        nickName: nickName
      }
    })

    if (nickName === verificarNick?.nickName) {
      return res.status(401).send({ error: "NickName já cadastrado" })
    }

    const verificarEmail = await prisma.user.findUnique({
      where: {
        email: email,
      }
    })

    if (email === verificarEmail?.email) {
      return res.status(401).send({ error: "Email já cadastrado" })
    }


    const user = await prisma.user.create({
      data: {
        email: email,
        password: password,
        nickName: nickName,
        name: name,
      },
    })

    res.send(user)
  }
}
