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

  async login(req, res) {
    const { email, password } = req.body

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
      select: {
        name: true,
        email: true,
        nickName: true,
        password: true
      }
    })
    if (!user) {
      return res.status(401).json({ error: "Email ou senha invalidos" });
    }

    const verificaSenha = await bcrypt.compare(password, user.password)

    if (!verificaSenha) {
      return res.status(401).json({ error: "Email ou senha invalidos" });
    }


    res.status(200).json({ message: 'logado !' })
  },

  async getAll(req, res) {
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
