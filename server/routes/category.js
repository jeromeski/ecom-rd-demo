const express = require('express');
const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require('../middlewares/auth');

// category controller

const { create, read, update, remove, list } = require('../controllers/category');

// routes

router.post('/category', create);
router.get('/category/:slug', read);
router.put('/category/:slug', authCheck, adminCheck, update);
router.delete('/category/:slug', authCheck, adminCheck, remove);
router.get('/categories', list);

module.exports = router;
