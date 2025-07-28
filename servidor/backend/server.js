const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

const dados_colecao = [
    { id: 1, img: "assets/sandalia fem coleção.png", nome: "Sandália Feminina Velisa", categoria: "Casual", preco: 149.99 },
    { id: 2, img: "assets/sandalia masc coleção.png", nome: "Sandália Masculina Couro Torven", categoria: "Casual", preco: 249.90 },
    { id: 3, img: "assets/tenis casual fem coleção.webp", nome: "Tênis Casual Feminino Nivora", categoria: "Casual", preco: 279.50 },
    { id: 4, img: "assets/tenis ccasual masc coleçao.webp", nome: "Tênis Casual Masculino Vorex", categoria: "Casual", preco: 189.90 },
    { id: 5, img: "assets/tenis ccorrid fem coleção.png", nome: "Tênis Corrida Feminino Xalura", categoria: "Esportivo", preco: 279.90 },
    { id: 6, img: "assets/tenis corrida masc coleção.png", nome: "Tênis Corrida Maculino Dravenox", categoria: "Esportivo", preco: 290.00 },
    { id: 7, img: "assets/jaqueta esportiva fem coleção.webp", nome: "Jaqueta Feminina Avenli", categoria: "Esportivo", preco: 299.99 },
    { id: 8, img: "assets/jaqueta esportiva masc coleção.webp", nome: "Jaqueta Masculina Kryvon", categoria: "Esportivo", preco: 299.99 },
    { id: 9, img: "assets/bota fem coleção.png", nome: "Bota Feminina Zorya", categoria: "Esportivo", preco: 299.99 },
    { id: 10, img: "assets/bota mas coleção.png", nome: "Bota Masculina Bravorn", categoria: "Esportivo", preco: 299.99 }
];

const dados_calcados = [
    { id: 1, img: "assets/tenis esportivo.png", nome: "Nike Air Max SYSTM", categoria: "Corrida", preco: 349.99 },
    { id: 2, img: "assets/jordan es.png", nome: "Jordan Series ES", categoria: "Casual", preco: 599.00 },
    { id: 3, img: "assets/adidas orange.png", nome: "Adidas Orange", categoria: "Casual", preco: 129.50 },
    { id: 4, img: "assets/Adidas Yeezy Boost 700.png", nome: "Adidas Yeezy Boost 700", categoria: "Futebol", preco: 450.00 },
    { id: 5, img: "assets/campus shoe.png", nome: "CAMPUS 00S SHOES", categoria: "Urbano", preco: 299.90 },
    { id: 6, img: "assets/produto 9.png", nome: "Tenis de Corrida", categoria: "Corrida", preco: 199.99 },
    { id: 7, img: "assets/produto 10.png", nome: "Nike Air Force 1", categoria: "Casual", preco: 890.00 },
    { id: 8, img: "assets/produto 11.png", nome: "RAPIDAFLEX SHOES", categoria: "Urbano", preco: 399.00 }
];

const dados_masculino = [
    { id: 1, img: "assets/Air Force 1 Low Billie Tripe White.png", nome: "Nike Air Force 1 Low Billie", categoria: "Casual", preco: 299.99 },
    { id: 2, img: "assets/Air Force 1 x Slam Jam.png", nome: "Air Force 1 x Slam Jam", categoria: "Casual", preco: 320.00 },
    { id: 3, img: "assets/Air Force 1 x UNDEFEATED-Nike.png", nome: "Air Force 1 x UNDEFEATED", categoria: "Casual", preco: 429.50 },
    { id: 4, img: "assets/chuteira masculina.png", nome: "Chuteira Masculina", categoria: "Esportivo", preco: 299.00 },
    { id: 5, img: "assets/dry fir laranja.png", nome: "Camisa Dry-Fit Laranja", categoria: "Esportivo", preco: 99.90 },
    { id: 6, img: "assets/dry fit.png", nome: "Camisa Dry-Fit Verde", categoria: "Esportivo", preco: 89.90 },
    { id: 7, img: "assets/shorts masculino.png", nome: "Short Msculino Preto", categoria: "Esportivo", preco: 79.90 },
    { id: 8, img: "assets/produto camiseta azul.png", nome: "Camisa Azul", categoria: "Esportivo", preco: 109.99 }
];

const dados_feminino = [
    { id: 1, img: "assets/tenis preto feminino.png", nome: "Tênis Lumera Preto", categoria: "Casual", preco: 249.99 },
    { id: 2, img: "assets/produto 3.png", nome: "Conjunto Academia", categoria: "Esportivo", preco: 120.00 },
    { id: 3, img: "assets/tenis feminino colorido.png", nome: "Tênis Corrida Zyntrax", categoria: "Esportivo", preco: 429.50 },
    { id: 4, img: "assets/produto 5.png", nome: "Calça Leggings", categoria: "Esportivo", preco: 110.00 },
    { id: 5, img: "assets/tenis branco feminino.png", nome: "Tênis Kivena Branco", categoria: "Casuall", preco: 250.90 },
    { id: 6, img: "assets/produto 6.png", nome: "Conjunto Saia e Blusa", categoria: "Esportivo", preco: 200.00 },
    { id: 7, img: "assets/Bota feminina.png", nome: "Bota Vallore Marrom", categoria: "Casual", preco: 299.90 },
    { id: 8, img: "assets/produto 4.png", nome: "Calça Leggings Preta Nike", categoria: "Esportivo", preco: 134.99 }
];



app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/api/colecao', (req, res) => res.json(dados_colecao));
app.get('/api/calcados', (req, res) => res.json(dados_calcados));
app.get('/api/masculino', (req, res) => res.json(dados_masculino));
app.get('/api/feminino', (req, res) => res.json(dados_feminino));

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
    console.log('Para acessar o site, abra a URL acima no seu navegador (ex: http://localhost:3000/colecao.html)');
});