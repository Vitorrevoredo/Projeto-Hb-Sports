const db = require('../database/db.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'seu-segredo-super-secreto'; 

const registrarUsuario = (req, res) => {
    const { fullName, cpf, email, password } = req.body;

    if (!fullName || !cpf || !email || !password) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    const salt = bcrypt.genSaltSync(10);
    const senha_hash = bcrypt.hashSync(password, salt);

    const sql = `INSERT INTO usuarios (nome_completo, cpf, email, senha_hash) VALUES (?, ?, ?, ?)`;
    db.run(sql, [fullName, cpf, email, senha_hash], function(err) {
        if (err) {
            
            if (err.message.includes('UNIQUE')) {
                return res.status(409).json({ error: 'Email ou CPF já cadastrado.' });
            }
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Usuário cadastrado com sucesso!', userId: this.lastID });
    });
};

const loginUsuario = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
    }

    const sql = `SELECT * FROM usuarios WHERE email = ?`;
    db.get(sql, [email], (err, user) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!user) {
            return res.status(401).json({ error: 'Credenciais inválidas.' }); 
        }

        
        const senhaValida = bcrypt.compareSync(password, user.senha_hash);
        if (!senhaValida) {
            return res.status(401).json({ error: 'Credenciais inválidas.' }); 
        }

        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
            expiresIn: '1h' 
        });

        res.json({ message: 'Login bem-sucedido!', token: token });
    });
};

module.exports = {
    registrarUsuario,
    loginUsuario
};