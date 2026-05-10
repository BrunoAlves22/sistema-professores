const prisma = require("../prisma");
const {
  dayOfWeekMap,
  periodMap,
  teacherTypeMap,
  assignmentStatusMap,
} = require("../utils/translations");

class ListClassAssignmentsService {
  async execute() {
    const assignments = await prisma.classAssignment.findMany({
      include: { teacher: true, schedule: true, classroom: true },
    });

    return assignments.map((assignment) => ({
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
    }));
  }
}

module.exports = { ListClassAssignmentsService };
