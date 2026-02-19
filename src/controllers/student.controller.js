const service = require("../services/student.service");
const students = require("../DB/students");

exports.getStudents = (req, res) => {
  return res.status(200).send(students);
};

exports.getStudentsById = (req, res) => {
  const userId = req.params.id;
  if (!userId) return res.status(400).send("id not found");

  const student = service.getById(userId);

  if (!student) return res.status(404).send("Student not found");
  res.status(200).send(student);
};
//* ТУт конец
exports.createStudent = (req, res) => {
  const name = (req.body.name || "").trim();

  if (!name) {
    return res.status(400).send("Name is required");
  }
  const newStudent = { id: students.length + 1, name };
  students.push(newStudent);

  return res.status(201).json(newStudent);
};
