import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getUser = {
  async mostrarUser(req, res) {
    try {
      const { name } = req.query;

      const users = await prisma.user.findMany({
        where: {
          name: {
            startsWith: name,
          },
        },
        select: {
          name: true,
          email: true,
          nickName: true,
        },
      });

      if (users.length === 0) {
        return res.status(404).json({ message: "usuario não encontrado" });
      }

      res.send(users);
    } catch (err) {
      res.status(400).json({ message: "não foi possivel listar os usuarios" });
    }
  },
};

export { getUser };
