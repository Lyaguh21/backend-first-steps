const prisma = require("../prisma");

exports.getAll = async () => {
  return prisma.student.findMany();
};

exports.getById = async (userId) => {
  return prisma.student.findUnique({
    where: { id: Number(userId) },
  });
};

exports.create = async (name, email, age) => {
  const newStudent = { name, email, age };
  return prisma.student.create({
    data: newStudent,
  });
};
