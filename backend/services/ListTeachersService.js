const prisma = require("../prisma");
const { AppError } = require("../errors/AppError");

class ListTeachersService {
  async execute() {
    const teachers = await prisma.teacher.findMany();

    if (teachers.length === 0) {
      throw new AppError("Nenhum professor cadastrado.", 404);
    }

    return teachers;
  }
}

module.exports = { ListTeachersService };
