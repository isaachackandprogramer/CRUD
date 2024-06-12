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

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).send({ error: "Nenhum dado fornecido" });
    }

    if (!email?.trim()) {
      return res.status(400).send({ error: "O campo email é obrigatório" });
    }
    if (!password?.trim()) {
      return res.status(400).send({ error: "O campo password é obrigatório" });
    }
    if (!nickName?.trim()) {
      return res.status(400).send({ error: "O campo nickName é obrigatório" });
    }
    if (!name?.trim()) {
      return res.status(400).send({ error: "O campo name é obrigatório" });
    }

    if (email === verificarUnique?.email) {
      return res.status(409).send({ error: "Email já cadastrado" })
    }

    if (nickName === verificarUnique?.nickName) {
      return res.status(409).send({ error: "nickName já cadastrado" })
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
