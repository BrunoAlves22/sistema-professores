const prisma = require("../prisma");

class ListClassroomsService {
  async execute() {
    const classrooms = await prisma.classroom.findMany();
    return classrooms;
  }
}

module.exports = { ListClassroomsService };
