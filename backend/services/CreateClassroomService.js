const prisma = require("../prisma");
const { AppError } = require("../errors/AppError");

class CreateClassroomService {
  async execute({ name, grade, room }) {
    const classroomAlreadyExists = await prisma.classroom.findFirst({
      where: { name, grade, room },
    });

    if (classroomAlreadyExists) {
      throw new AppError("Turma já cadastrada", 409);
    }

    const classroom = await prisma.classroom.create({
      data: { name, grade, room },
    });

    return classroom;
  }
}

module.exports = { CreateClassroomService };
