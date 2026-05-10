const prisma = require("../prisma");
const { AppError } = require("../errors/AppError");

class DeleteClassScheduleService {
  async execute({ id }) {
    const scheduleExists = await prisma.classSchedule.findFirst({
      where: { id },
    });

    if (!scheduleExists) {
      throw new AppError("Horário não encontrado", 404);
    }

    // Deleta as atribuições vinculadas antes de deletar o horário
    await prisma.classAssignment.deleteMany({
      where: { scheduleId: id },
    });

    await prisma.classSchedule.delete({ where: { id } });

    return { mensagem: "Horário deletado com sucesso!" };
  }
}

module.exports = { DeleteClassScheduleService };
