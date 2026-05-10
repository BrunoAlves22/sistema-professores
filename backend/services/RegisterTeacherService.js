const prisma = require("../prisma");
const { AppError } = require("../errors/AppError");
const { teacherTypeMap } = require("../utils/translations");

class RegisterTeacherService {
  async execute({ name, email, phone, type, subject }) {
    if (email) {
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

    return {
      ...teacher,
      type: teacherTypeMap[teacher.type],
    };
  }
}

module.exports = { RegisterTeacherService };
