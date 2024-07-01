import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const accountController = {
  async create(req, res) {
    const { email, password, nickName, name } = req.body;

    const verificarUnique = await prisma.user.findFirst({
      where: {
        OR: [
          {
            email: email,
          },
          {
            nickName: nickName,
          },
        ],
      },
    });

    console.log(verificarUnique);

    const passwordHash = await bcrypt.hash(password, 12);

    if (email === verificarUnique?.email) {
      return res.status(409).send({ error: "Email já cadastrado" });
    }

    if (nickName === verificarUnique?.nickName) {
      return res.status(409).send({ error: "nickName já cadastrado" });
    }

    const user = await prisma.user.create({
      data: {
        email: email,
        password: passwordHash,
        nickName: nickName,
        name: name,
      },
    });

    res.status(201).json({ message: "usuario criado com sucesso !" });
  },
};
