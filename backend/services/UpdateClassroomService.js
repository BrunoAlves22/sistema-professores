const prisma = require("../prisma");
const { AppError } = require("../errors/AppError");

class UpdateClassroomService {
  async execute({ id, name, grade, room }) {
    const classroomExists = await prisma.classroom.findFirst({ where: { id } });

    if (!classroomExists) {
      throw new AppError("Turma não encontrada", 404);
    }

    const classroom = await prisma.classroom.update({
      where: { id },
      data: { name, grade, room },
    });

    return classroom;
  }
}

module.exports = { UpdateClassroomService };
