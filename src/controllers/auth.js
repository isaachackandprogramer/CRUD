import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const authController = {
  async create(req, res) {
    const { email, password, nickName, name } = req.body;

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
