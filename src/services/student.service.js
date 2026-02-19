const { students } = require("../DB");

exports.getAll = () => {
  return students;
};

exports.getById = (userId) => {
  student = students.find((el) => el.id === Number(userId));
  return student;
};

exports.create = (name) => {
  const newStudent = { id: students.length + 1, name };
  students.push(newStudent);

  return newStudent;
};
