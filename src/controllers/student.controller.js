const service = require("../services/student.service");

function parseId(idRaw) {
  const id = Number(idRaw);
  if (!Number.isInteger(id)) return null;
  return id;
}

exports.getStudents = async (req, res) => {
  studentsList = await service.getAll();
  return res.status(200).json(studentsList);
};

exports.getStudentsById = async (req, res) => {
  const id = req.validated.params.id;

  const student = await service.getById(id);
  if (!student) return res.status(404).json({ error: "Student not found" });

  return res.status(200).json(student);
};

exports.createStudent = async (req, res) => {
  const { name, email, age } = req.validated.body;

  newStudent = await service.create(name, email, age);

  return res.status(201).json(newStudent);
};

exports.updateStudent = async (req, res) => {
  const id = req.validated.params;
  const data = req.validated.body;

  const updatedStudent = await service.update(id, data);
  if (!updatedStudent)
    return res.status(404).json({ error: "Student not found" });

  return res.status(200).json(updatedStudent);
};

exports.deleteStudent = async (req, res) => {
  const id = req.validated.params.id;

  const deletedStudent = await service.delete(id);
  if (!deletedStudent)
    return res.status(404).json({ error: "Student not found" });

  return res.status(200).json(deletedStudent);
};
