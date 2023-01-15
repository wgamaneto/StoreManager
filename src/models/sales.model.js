const camelize = require('camelize');
const connection = require('../database/connections');

const getAllSales = async () => {
  const [result] = await connection.execute(
    `SELECT * FROM sales AS s
    INNER JOIN sales_products AS sp ON s.id = sp.sale_id
    ORDER BY id, product_id`,
  );
  return camelize(result);
};

const getSaleById = async (id) => {
  const [result] = await connection.execute(
    `SELECT date, product_id, quantity FROM sales AS s
    INNER JOIN sales_products AS sp ON s.id = sp.sale_id
    WHERE ID = ?
    ORDER BY id, product_id`,
    [id],
  );
  return camelize(result);
};

const insertSale = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO sales () value ()',
  );
  return insertId;
};

const insertProductsSale = async (id, { productId, quantity }) => {
  await connection.execute(
    'INSERT INTO sales_products (sale_id, product_id, quantity) VALUE (?, ?, ?)',
    [id, productId, quantity],
  );
  const objReturn = { id, productId, quantity };
  return objReturn;
};

const updateProductsSale = async (id, { productId, quantity }) => {
  await connection.execute(
    'UPDATE sales_products SET quantity = ? WHERE sale_id = ? AND product_id = ?',
    [quantity, id, productId],
  );
  const objReturn = { id, productId, quantity };
  return objReturn;
};

const deleteSale = async (id) => {
  await connection.execute(
    'DELETE FROM sales WHERE id = ?',
    [id],
  );
  await connection.execute(
    'DELETE FROM sales_products WHERE sale_id = ?',
    [id],
  );
};

module.exports = {
  getAllSales,
  getSaleById,
  insertSale,
  insertProductsSale,
  updateProductsSale,
  deleteSale,
};