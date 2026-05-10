const prisma = require("../prisma");
const { AppError } = require("../errors/AppError");
const {
  dayOfWeekMap,
  periodMap,
  teacherTypeMap,
  assignmentStatusMap,
} = require("../utils/translations");

class CreateClassAssignmentService {
  async execute({ teacherId, scheduleId, classRoomId, date, notes }) {
    const teacherExists = await prisma.teacher.findFirst({
      where: { id: teacherId },
    });
    if (!teacherExists) throw new AppError("Professor não encontrado", 404);

    const scheduleExists = await prisma.classSchedule.findFirst({
      where: { id: scheduleId },
    });
    if (!scheduleExists) throw new AppError("Horário não encontrado", 404);

    const classroomExists = await prisma.classroom.findFirst({
      where: { id: classRoomId },
    });
    if (!classroomExists) throw new AppError("Turma não encontrada", 404);

    const assignmentAlreadyExists = await prisma.classAssignment.findFirst({
      where: { scheduleId, classRoomId, date },
    });
    if (assignmentAlreadyExists)
      throw new AppError(
        "Já existe uma atribuição para esse horário nessa data",
        409,
      );

    const assignment = await prisma.classAssignment.create({
      data: { teacherId, scheduleId, classRoomId, date, notes },
      include: { teacher: true, schedule: true, classroom: true },
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

module.exports = { CreateClassAssignmentService };
