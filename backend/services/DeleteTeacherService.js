const prisma = require("../prisma");
const { AppError } = require("../errors/AppError");

class DeleteTeacherService {
  async execute({ id }) {
    const teacherExists = await prisma.teacher.findFirst({ where: { id } });

    if (!teacherExists) {
      throw new AppError("Professor não encontrado", 404);
    }

    // Deleta as atribuições vinculadas antes de deletar o professor
    await prisma.classAssignment.deleteMany({
      where: { teacherId: id },
    });

    await prisma.teacher.delete({ where: { id } });

    return { mensagem: "Professor deletado com sucesso!" };
  }
}

module.exports = { DeleteTeacherService };
