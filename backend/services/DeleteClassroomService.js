const prisma = require("../prisma");
const { AppError } = require("../errors/AppError");

class DeleteClassroomService {
  async execute({ id }) {
    const classroomExists = await prisma.classroom.findFirst({ where: { id } });

    if (!classroomExists) {
      throw new AppError("Turma não encontrada", 404);
    }

    // Deleta as atribuições vinculadas antes de deletar a turma
    await prisma.classAssignment.deleteMany({
      where: { classRoomId: id },
    });

    await prisma.classroom.delete({ where: { id } });

    return { mensagem: "Turma deletada com sucesso!" };
  }
}

module.exports = { DeleteClassroomService };
