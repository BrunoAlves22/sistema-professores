const prisma = require("../prisma");
const { dayOfWeekMap, periodMap } = require("../utils/translations");

class ListClassSchedulesService {
  async execute() {
    const schedules = await prisma.classSchedule.findMany();

    const translatedSchedules = schedules.map((schedule) => ({
      ...schedule,
      dayOfWeek: dayOfWeekMap[schedule.dayOfWeek],
      period: periodMap[schedule.period],
    }));

    return translatedSchedules;
  }
}

module.exports = { ListClassSchedulesService };
