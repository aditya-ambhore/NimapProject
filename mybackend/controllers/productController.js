const db = require('../db/connection');

exports.getProducts = async (req, res) => {
  const { page = 1, pageSize = 10 } = req.query;
  const offset = (page - 1) * pageSize;
  const [rows] = await db.query(
    `SELECT products.id, products.name, categories.name AS categoryName
     FROM products
     JOIN categories ON products.categoryId = categories.id
     LIMIT ? OFFSET ?`,
    [parseInt(pageSize), parseInt(offset)]
  );
  res.json(rows);
};

exports.addProduct = async (req, res) => {
  const { name, categoryId } = req.body;
  await db.query('INSERT INTO products (name, categoryId) VALUES (?, ?)', [name, categoryId]);
  res.status(201).send();
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, categoryId } = req.body;
  await db.query('UPDATE products SET name = ?, categoryId = ? WHERE id = ?', [name, categoryId, id]);
  res.status(204).send();
};

exports.deleteProduct = async (req, res) => {
    const { id } = req.params;
    await db.query('DELETE FROM products WHERE id = ?', [id]);
    res.status(204).send();
  };
