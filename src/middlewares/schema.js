const Joi = require('joi');

const checkName = Joi.object({
  name: Joi.string().min(3).required(),
}).required().messages({
  'any.required': '{#label} is required',
  'string.min': '{#label} length must be at least 5 characters long',
});

const checkNameLength = Joi.object({
  name: Joi.string().min(5).required(),
}).required().messages({
  'string.min': '{#label} length must be at least 5 characters long',
});

const checkSale = Joi.object({
  productId: Joi.number().integer().required(),
  quantity: Joi.number().integer().required(),
}).required().messages({
  'any.required': '{#label} is required',
});

const checkSaleQuantity = Joi.object({
  productId: Joi.number().integer().required(),
  quantity: Joi.number().integer().min(1).required(),
}).required().messages({
  'number.min': '{#label} must be greater than or equal to 1',
});

module.exports = {
  checkName,
  checkNameLength,
  checkSale,
  checkSaleQuantity,
};