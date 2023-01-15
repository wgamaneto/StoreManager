const { validateName, nameLength } = require('./schema');

const validationProduct = (req, res, next) => {
  const { name } = req.body;

  const input = validateName.validate({ name });
  if (input.error) return res.status(400).json({ message: input.error.message });
  const { error } = nameLength.validate({ name });
  if (error) return res.status(422).json({ message: error.message });

  next();
};

module.exports = { validationProduct };