import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const getUser = {
  async mostrarUser(req, res) {

    try {
      const users = await prisma.user.findMany({
        select: {
          name: true,
          email: true,
          nickName: true,
        }
      })
      res.send(users)
    } catch (err) {
      res.status(400).send({ message: "não foi possivel listar os usuarios" });
    }
  }
}

export { getUser }