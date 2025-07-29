const express = require('express');
const path = require('path');


const produtosRoutes = require('./routes/produtosRoute.js');
const authRoutes = require('./routes/authRoute.js');

const app = express();
const PORT = 3000;


app.use(express.static(path.join(__dirname, '..', 'public')));


app.use('/api/produtos', produtosRoutes);
app.use('/api/auth', authRoutes)



app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});