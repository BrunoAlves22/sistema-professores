const prisma = require("../prisma");
const { teacherTypeMap } = require("../utils/translations");

class ListTeachersService {
  async execute() {
    const teachers = await prisma.teacher.findMany();

    return teachers.map((teacher) => ({
      ...teacher,
      type: teacherTypeMap[teacher.type],
    }));
  }
}

module.exports = { ListTeachersService };
