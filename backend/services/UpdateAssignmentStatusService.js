const prisma = require("../prisma");
const { AppError } = require("../errors/AppError");
const {
  dayOfWeekMap,
  periodMap,
  teacherTypeMap,
  assignmentStatusMap,
} = require("../utils/translations");

class UpdateAssignmentStatusService {
  async execute({ id, status }) {
    const assignmentExists = await prisma.classAssignment.findFirst({
      where: { id },
    });

    if (!assignmentExists) {
      throw new AppError("Atribuição não encontrada", 404);
    }

    const assignment = await prisma.classAssignment.update({
      where: { id },
      data: { status },
      include: {
        teacher: true,
        schedule: true,
        classroom: true,
      },
    });

    return {
      ...assignment,
      status: assignmentStatusMap[assignment.status],
      teacher: {
        ...assignment.teacher,
        type: teacherTypeMap[assignment.teacher.type],
      },
      schedule: {
        ...assignment.schedule,
        dayOfWeek: dayOfWeekMap[assignment.schedule.dayOfWeek],
        period: periodMap[assignment.schedule.period],
      },
    };
  }
}

module.exports = { UpdateAssignmentStatusService };
