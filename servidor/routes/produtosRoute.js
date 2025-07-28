const express = require('express');
const router = express.Router();
const { getProdutosPorPagina } = require('../controllers/produtosController');

router.get('/:pagina', getProdutosPorPagina);

module.exports = router;