const service = require("../services/student.service");

exports.getStudents = (req, res) => {
  studentsList = service.getAll();
  return res.status(200).json(studentsList);
};

exports.getStudentsById = (req, res) => {
  const userId = req.params.id;
  if (!userId) return res.status(400).send("id not found");

  const student = service.getById(userId);
  if (!student) return res.status(404).send("Student not found");

  return res.status(200).json(student);
};

exports.createStudent = (req, res) => {
  const name = (req.body.name || "").trim();
  if (!name) {
    return res.status(400).send("Name is required");
  }

  newStudent = service.create(name);

  return res.status(201).json(newStudent);
};
