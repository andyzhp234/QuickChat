// an middleware that checks the requests is correctly formatted
const schemaValidator = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      res.status(400).send({ message: error.details[0].message });
      return;
    }
    next();
  };
};

export default schemaValidator;
