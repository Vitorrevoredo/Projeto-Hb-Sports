const db = require('../database/db.js');

const getProdutosPorPagina = (req, res) => {
    const { pagina } = req.params; 
    const { marca, categoria, tamanho, cor, precoMin, precoMax } = req.query; // Filtros da URL

    let sql = `SELECT * FROM produtos WHERE pagina = ?`;
    const params = [pagina];

    if (marca) {
        sql += ` AND marca = ?`;
        params.push(marca);
    }
    if (categoria) {
        sql += ` AND categoria = ?`;
        params.push(categoria);
    }


    if (precoMin && precoMax) {
        sql += ` AND preco BETWEEN ? AND ?`;
        params.push(precoMin, precoMax);
    }
    
    db.all(sql, params, (err, rows) => {
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