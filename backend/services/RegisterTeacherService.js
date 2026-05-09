const prisma = require("../prisma");
const { AppError } = require("../errors/AppError");

class RegisterTeacherService {
  async execute({ name, email, phone, type, subject }) {
    if (email) {
      // só verifica duplicata se o email foi informado
      const emailAlreadyExists = await prisma.teacher.findFirst({
        where: { email },
      });

      if (emailAlreadyExists) {
        throw new AppError("Email já cadastrado", 409);
      }
    }

    const teacher = await prisma.teacher.create({
      data: {
        name,
        email,
        phone,
        type,
        subject,
      },
    });

    return teacher;
  }
}

module.exports = { RegisterTeacherService };
