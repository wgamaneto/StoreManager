const { checkName, checkNameLength } = require('./schema');

const validationProduct = (req, res, next) => {
  const { name } = req.body;

  const input = checkName.validate({ name });

  if (input.error) return res.status(400).json({ message: input.error.message });

  const { error } = checkNameLength.validate({ name });

  if (error) return res.status(422).json({ message: error.message });

  next();
};

module.exports = { validationProduct };