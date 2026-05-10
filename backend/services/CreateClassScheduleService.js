const prisma = require("../prisma");
const { AppError } = require("../errors/AppError");
const { dayOfWeekMap, periodMap } = require("../utils/translations");

class CreateClassScheduleService {
  async execute({ lessonNumber, dayOfWeek, period, startTime, endTime }) {
    const scheduleAlreadyExists = await prisma.classSchedule.findFirst({
      where: { lessonNumber, dayOfWeek, period },
    });

    if (scheduleAlreadyExists) {
      throw new AppError("Horário já cadastrado", 409);
    }

    const schedule = await prisma.classSchedule.create({
      data: { lessonNumber, dayOfWeek, period, startTime, endTime },
    });

    return {
      ...schedule,
      dayOfWeek: dayOfWeekMap[schedule.dayOfWeek],
      period: periodMap[schedule.period],
    };
  }
}

module.exports = { CreateClassScheduleService };
