import { ZodError } from "zod";

export const validate = (schema) => {
  return (req, res, next) => {
    try {
      const data =
        req.method === "GET" || req.method === "DELETE" ? req.query : req.body;
      const validated = schema.parse(data);
      req.validatedData = validated;
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        return res.status(400).json({
          success: false,
          errors: err.issues.map((issue) => issue.message), // ✅ Use .issues instead of .errors
        });
      }

      // For non-Zod errors, pass to error handler
      next(err);
    }
  };
};
