const router = require("express").Router();
const controller = require("../controllers/student.controller");

router.get("/students", controller.getStudents);
router.get("/students/:id", controller.getStudentsById);
router.post("/students", controller.createStudent);

modue.exports = router;
