const prisma = require("../prisma");
const { AppError } = require("../errors/AppError");
const { dayOfWeekMap, periodMap } = require("../utils/translations");

class UpdateClassScheduleService {
  async execute({ id, lessonNumber, dayOfWeek, period, startTime, endTime }) {
    const scheduleExists = await prisma.classSchedule.findFirst({
      where: { id },
    });

    if (!scheduleExists) {
      throw new AppError("Horário não encontrado", 404);
    }

    const schedule = await prisma.classSchedule.update({
      where: { id },
      data: { lessonNumber, dayOfWeek, period, startTime, endTime },
    });

    return {
      ...schedule,
      dayOfWeek: dayOfWeekMap[schedule.dayOfWeek],
      period: periodMap[schedule.period],
    };
  }
}

module.exports = { UpdateClassScheduleService };
