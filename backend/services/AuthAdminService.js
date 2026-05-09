const prisma = require("../prisma");
const { compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const { AppError } = require("../errors/AppError");

class AuthAdminService {
  async execute({ email, password }) {
    const admin = await prisma.admin.findFirst({
      where: { email },
    });

    if (!admin) {
      throw new AppError("Email ou senha incorretos", 401);
    }

    const passwordMatch = await compare(password, admin.password);

    if (!passwordMatch) {
      throw new AppError("Email ou senha incorretos", 401);
    }

    const token = sign({ id: admin.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    const { password: _, ...adminWithoutPassword } = admin;

    return { admin: adminWithoutPassword, token };
  }
}

module.exports = { AuthAdminService };
