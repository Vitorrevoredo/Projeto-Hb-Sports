const express = require('express');
const router = express.Router();
const produtosController = require('../controllers/produtosController');

router.get('/', produtosController.getAllProdutos);
router.get('/item/:id', produtosController.getProdutoPorId);
router.get('/:pagina', produtosController.getProdutosPorPagina);

module.exports = router;