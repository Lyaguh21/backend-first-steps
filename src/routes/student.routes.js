const router = require("express").Router();
const controller = require("../controllers/student.controller");
const validate = require("../middlewares/validate");
const asyncHandler = require("../utils/asyncHandler");
const {
  createStudentSchema,
  updateStudentSchema,
  idParamsSchema,
} = require("../schemas/students.schema");
router.get("/", asyncHandler(controller.getStudents));
router.get(
  "/:id",
  validate(idParamsSchema),
  asyncHandler(controller.getStudentsById),
);
router.post(
  "/",
  validate(createStudentSchema),
  asyncHandler(controller.createStudent),
);
router.put(
  "/:id",
  validate(updateStudentSchema),
  asyncHandler(controller.updateStudent),
);
router.delete(
  "/:id",
  validate(idParamsSchema),
  asyncHandler(controller.deleteStudent),
);

module.exports = router;
