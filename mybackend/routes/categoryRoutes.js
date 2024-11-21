const express = require('express');
const { getCategories, addCategory, updateCategory, deleteCategory } = require('../controllers/categoryController');
const router = express.Router();

router.get('/categories', getCategories);
router.post('/categories', addCategory);
router.put('/categories/:id', updateCategory);
router.delete('/categories/:id', deleteCategory);

module.exports = router;
