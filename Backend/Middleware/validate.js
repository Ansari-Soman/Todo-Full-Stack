import { ZodError } from "zod";

export const validate = (schema) => {
  return (req, res, next) => {
    try {
      // Validate body if schema.body exists
      if (schema.body) {
        console.log("before body == ", req.body);
        req.body = schema.body.parse(req.body);
        console.log("after body == ", req.body);
      }

      // Validate params if schema.params exists
      if (schema.params) {
        console.log("Schema. pramms");
        req.params = schema.params.parse(req.params);
        console.log("After == ", req.params);
      }

      // Validate query if schema.query exists
      if (schema.query) {
        req.query = schema.query.parse(req.query);
      }

      next();
    } catch (err) {
      if (err instanceof ZodError) {
        return res.status(400).json({
          success: false,
          errors: err.issues.map((issue) => issue.message),
        });
      }
      next(err);
    }
  };
};
