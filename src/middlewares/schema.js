const Joi = require('joi');

const validateName = Joi.object({
  name: Joi.string().min(3).require(),
}).required().messages({
  'any.required': '{label} is required',
});

const nameLength = Joi.object({
  name: Joi.string().min(5).required(),
}).required().messages({
  'string.min': '{#label} length must be at least 5 characters long',
});

module.exports = {
  validateName,
  nameLength,
};