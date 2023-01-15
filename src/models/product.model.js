const connection = require('../database/connections');

const getAllProducts = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM products', [],
  );
  return result;
};

const getProductById = async (id) => {
  const [[result]] = await connection.execute(
    'SELECT * FROM products WHERE id = ?', [id],
  );
  return result;
};

const getProductByName = async (name) => {
  const nameForLike = `%${name}%`;
  const [result] = await connection.execute(
    `SELECT * FROM products WHERE name LIKE "${nameForLike}"`, [],
  );
  return result;
};

const insertProduct = async (name) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO products (name) VALUE (?)',
    [name],
  );
  return { id: insertId, name };
};

const updateProduct = async (id, name) => {
  const [results] = await connection.execute(
    'SELECT * FROM products', [],
  );
  const toUpdate = results.findIndex((result) => (result.id === id));
  results.splice(toUpdate, 1, { id, name });

  await connection.execute(
    'UPDATE products SET name = ? WHERE id = ?',
    [name, id],
  );

  return results[toUpdate];
};

const deleteProduct = async (id) => {
  const [{ changedRows }] = await connection.execute(
    'DELETE FROM products WHERE id = ?',
    [id],
  );
  return changedRows;
};

module.exports = {
  getAllProducts,
  getProductById,
  getProductByName,
  insertProduct,
  updateProduct,
  deleteProduct,
};