import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const accountController = {
  async create(req, res) {
    const { email, password, nickName, name } = req.body;


    const verificarUnique = await prisma.user.findFirst({
      where: {
        OR: [
          {
            email: email
          },
          {
            nickName: nickName
          }
        ]
      },
    })

    console.log(verificarUnique)

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
