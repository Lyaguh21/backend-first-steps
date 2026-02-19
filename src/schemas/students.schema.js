const { z } = require("zod");

const idParamsSchema = z.object({
  params: z.object({
    id: z.coerce.number().int().positive(),
  }),
});

const createStudentSchema = z.object({
  body: z.object({
    name: z.string().trim().min(3, "name is required"),
    email: z.string().email("invalidate email").optional(),
    age: z.coerce.number().int().positive().optional(),
  }),
});

const updateStudentSchema = z.object({
  params: z.object({
    id: z.coerce.number().int().positive(),
  }),
  body: z
    .object({
      name: z.string().trim().min(1, "name is required").optional(),
      email: z.string().email("invalid email").optional(),
      age: z.coerce.number().int().positive().optional(),
    })
    .refine((data) => Object.keys(data).length > 0, {
      message: "Все поля должны быть заполнены",
      path: ["body"],
    }),
});

module.exports = {
  idParamsSchema,
  updateStudentSchema,
  createStudentSchema,
};
