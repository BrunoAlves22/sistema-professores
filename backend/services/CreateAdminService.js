const prisma = require("../prisma");
const { hash } = require("bcryptjs");
const { AppError } = require("../errors/AppError");

class CreateAdminService {
  async execute({ name, email, password }) {
    const userAlreadyExists = await prisma.admin.findFirst({
      where: {
        email,
      },
    });

    if (userAlreadyExists) {
      throw new AppError("Usuário já existe", 409);
    }

    const passwordHash = await hash(password, 8);

    const admin = await prisma.admin.create({
      data: {
        name,
        email,
        password: passwordHash,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return admin;
  }
}

module.exports = { CreateAdminService };
