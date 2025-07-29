const express = require('express');
const router = express.Router();
const produtosController = require('../controllers/produtosController'); // Ajuste o caminho se necessário


router.get('/:pagina', produtosController.getProdutosPorPagina);


router.get('/', produtosController.getAllProdutos);

module.exports = router;