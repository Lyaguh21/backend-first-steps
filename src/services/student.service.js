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

exports.update = async (userId, data) => {
  const existing = await prisma.student.findUnique({
    where: { id: Number(userId) },
  });
  if (!existing) return null;

  return prisma.student.update({
    where: { id: Number(userId) },
    data: data,
  });
};

exports.delete = async (userId) => {
  const existing = await prisma.student.findUnique({
    where: { id: Number(userId) },
  });
  if (!existing) return null;

  return prisma.student.delete({
    where: {
      id: Number(userId),
    },
  });
};
