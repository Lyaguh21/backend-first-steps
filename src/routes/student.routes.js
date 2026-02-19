const router = require("express").Router();
const controller = require("../controllers/student.controller");

router.get("/", controller.getStudents);
router.get("/:id", controller.getStudentsById);
router.post("/", controller.createStudent);

module.exports = router;
