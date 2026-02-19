const service = require("../services/student.service");

exports.getStudents = async (req, res) => {
  studentsList = await service.getAll();
  return res.status(200).json(studentsList);
};

exports.getStudentsById = async (req, res) => {
  const userId = req.params.id;
  if (!userId) return res.status(400).send("id not found");

  const student = await service.getById(userId);
  if (!student) return res.status(404).send("Student not found");

  return res.status(200).json(student);
};

exports.createStudent = async (req, res) => {
  const name = (req.body.name || "").trim();
  const email = (req.body.email || "").trim();
  const age = req.body.age;

  if (!name) {
    return res.status(400).send("Name is required");
  }
  if (!email) {
    return res.status(400).send("Email is required");
  }
  if (!age) {
    return res.status(400).send("Age is required");
  }

  newStudent = await service.create(name, email, age);

  return res.status(201).json(newStudent);
};
