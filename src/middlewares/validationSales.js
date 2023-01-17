const { checkSale, checkSaleQuantity } = require('./schema');

const validateSaleInputs = (req, res, next) => {
  const sales = req.body;

  const errorsRequired = [];

  sales.forEach(({ productId, quantity }) => {
    const { error } = checkSale.validate({ productId, quantity });

    if (error) errorsRequired.push(error);
  });

  if (errorsRequired.length > 0) {
    return res.status(400).json({ message: errorsRequired[0].message });
  }

  next();
};

const validateSalesValues = (req, res, next) => {
  const sales = req.body;

  const errorsVerify = [];

  sales.forEach(({ productId, quantity }) => {
    const { error } = checkSaleQuantity.validate({ productId, quantity });

    if (error) {
      errorsVerify.push(error);
    }
  });

  if (errorsVerify.length > 0) {
    return res.status(422).json({ message: errorsVerify[0].message });
  }

  next();
};

module.exports = { validateSaleInputs, validateSalesValues };