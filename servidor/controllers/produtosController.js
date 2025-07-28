const db = require('../database/db.js');

const getProdutosPorPagina = (req, res) => {
    
    const { pagina } = req.params;

    const sql = "SELECT * FROM produtos WHERE pagina = ?";

    db.all(sql, [pagina], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
};

module.exports = {
    getProdutosPorPagina
};