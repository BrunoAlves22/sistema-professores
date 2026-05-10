const prisma = require("../prisma");
const { AppError } = require("../errors/AppError");

class DeleteClassAssignmentService {
  async execute({ id }) {
    const assignmentExists = await prisma.classAssignment.findFirst({
      where: { id },
    });

    if (!assignmentExists) {
      throw new AppError("Atribuição não encontrada", 404);
    }

    await prisma.classAssignment.delete({ where: { id } });

    return { mensagem: "Atribuição deletada com sucesso!" };
  }
}

module.exports = { DeleteClassAssignmentService };
