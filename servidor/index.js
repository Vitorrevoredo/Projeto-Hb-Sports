const express = require('express');
const cors = require('cors');
const path = require('path');
const produtosRoute = require('./routes/produtosRoute');

const app = express();
const PORT = 3000;

app.use(cors());

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));


app.use('/api/produtos', produtosRoute);


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});