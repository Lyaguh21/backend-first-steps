const { ZodError } = require("zod");
module.exports = (schema) => (req, res, next) => {
  try {
    const parsed = schema.parse({
      body: req.body,
      params: req.params,
      query: req.query,
    });
    req.validated = parsed;
    next();
  } catch (e) {
    if (e instanceof ZodError) {
      return res.status(400).json({
        errors: e.errors,
        details: e.issues.map((i) => ({
          patch: i.path.join("."),
          message: i.message,
        })),
      });
    }
    next(e);
  }
};
