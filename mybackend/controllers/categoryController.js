const db = require('../db/connection');



exports.getCategories = async (req, res) => {
  const [rows] = await db.query('SELECT * FROM categories');
  res.json(rows);
};

exports.addCategory = async (req, res) => {
  const { name } = req.body;
  await db.query('INSERT INTO categories (name) VALUES (?)', [name]);
  res.status(201).send();
};

exports.updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  await db.query('UPDATE categories SET name = ? WHERE id = ?', [name, id]);
  res.status(204).send();
};

exports.deleteCategory = async (req, res) => {
  const { id } = req.params;
  await db.query('DELETE FROM categories WHERE id = ?', [id]);
  res.status(204).send();
};
