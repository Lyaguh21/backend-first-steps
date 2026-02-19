const students = require("../DB");

exports.getAll = () => {
  return students;
};

exports.getById = (userId) => {
  return students.find((el) => el.id === Number(userId));
};
