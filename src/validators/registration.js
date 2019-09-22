const Joi = require("joi");
const { ErrorHandler } = require("../errorHandlers");

module.exports = (req, res, next) => {
  const schema = {
    email: Joi.string().email(),
    password: Joi.string()
      .min(3)
      .max(6)
  };

  const { error } = Joi.validate(req.body, schema);

  if (error) {
    const message = error.details[0].message;
    throw new ErrorHandler(400, message);
  }

  next();
};
