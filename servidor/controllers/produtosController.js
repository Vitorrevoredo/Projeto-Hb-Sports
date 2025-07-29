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