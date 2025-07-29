const db = require('../database/db.js');

exports.getAllProdutos = (req, res) => {
    const sql = "SELECT * FROM produtos";
    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
};

exports.getProdutosPorPagina = (req, res) => {
    const pagina = req.params.pagina;
    const sql = "SELECT * FROM produtos WHERE pagina = ?";

    db.all(sql, [pagina], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
};

exports.getProdutoPorId = (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM produtos WHERE id = ?";

    db.get(sql, [id], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (!row) {
            res.status(404).json({ error: 'Produto não encontrado' });
            return;
        }
        res.json(row);
    });
};