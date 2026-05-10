const prisma = require("../prisma");
const { AppError } = require("../errors/AppError");
const { teacherTypeMap } = require("../utils/translations");

class UpdateTeacherService {
  async execute({ id, name, email, phone, subject, type }) {
    const teacherExists = await prisma.teacher.findFirst({ where: { id } });

    if (!teacherExists) {
      throw new AppError("Professor não encontrado", 404);
    }

    if (email && email !== teacherExists.email) {
      const emailAlreadyExists = await prisma.teacher.findFirst({
        where: { email },
      });
      if (emailAlreadyExists) {
        throw new AppError("Email já cadastrado", 409);
      }
    }

    const teacher = await prisma.teacher.update({
      where: { id },
      data: { name, email, phone, subject, type },
    });

    return {
      ...teacher,
      type: teacherTypeMap[teacher.type],
    };
  }
}

module.exports = { UpdateTeacherService };
