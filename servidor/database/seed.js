const db = require('./db.js');

const produtos = [
    { nome: "Sandália Feminina Velisa", categoria: "Casual", preco: 149.99, img: "assets/sandalia fem coleção.png", pagina: "colecao" },
    { nome: "Sandália Masculina Couro Torven", categoria: "Casual", preco: 249.90, img: "assets/sandalia masc coleção.png", pagina: "colecao" },
    { nome: "Tênis Casual Feminino Nivora", categoria: "Casual", preco: 279.50, img: "assets/tenis casual fem coleção.webp", pagina: "colecao" },
    { nome: "Tênis Casual Masculino Vorex", categoria: "Casual", preco: 189.90, img: "assets/tenis ccasual masc coleçao.webp", pagina: "colecao" },

    { nome: "Nike Air Max SYSTM", categoria: "Corrida", preco: 349.99, img: "assets/tenis esportivo.png", pagina: "calcados" },
    { nome: "Jordan Series ES", categoria: "Casual", preco: 599.00, img: "assets/jordan es.png", pagina: "calcados" },
    { nome: "Adidas Orange", categoria: "Casual", preco: 129.50, img: "assets/adidas orange.png", pagina: "calcados" },
    { nome: "Adidas Yeezy Boost 700", categoria: "Futebol", preco: 450.00, img: "assets/Adidas Yeezy Boost 700.png", pagina: "calcados" },

    { nome: "Nike Air Force 1 Low Billie", categoria: "Casual", preco: 299.99, img: "assets/Air Force 1 Low Billie Tripe White.png", pagina: "masculino" },
    { nome: "Air Force 1 x Slam Jam", categoria: "Casual", preco: 320.00, img: "assets/Air Force 1 x Slam Jam.png", pagina: "masculino" },
    { nome: "Chuteira Masculina", categoria: "Esportivo", preco: 299.00, img: "assets/chuteira masculina.png", pagina: "masculino" },
    { nome: "Camisa Dry-Fit Laranja", categoria: "Esportivo", preco: 99.90, img: "assets/dry fir laranja.png", pagina: "masculino" },

    { nome: "Tênis Lumera Preto", categoria: "Casual", preco: 249.99, img: "assets/tenis preto feminino.png", pagina: "feminino" },
    { nome: "Conjunto Academia", categoria: "Esportivo", preco: 120.00, img: "assets/produto 3.png", pagina: "feminino" },
    { nome: "Tênis Corrida Zyntrax", categoria: "Esportivo", preco: 429.50, img: "assets/tenis feminino colorido.png", pagina: "feminino" },
    { nome: "Calça Leggings", categoria: "Esportivo", preco: 110.00, img: "assets/produto 5.png", pagina: "feminino" }
];

db.serialize(() => {
    
    const sqlCreateTable = `
        CREATE TABLE IF NOT EXISTS produtos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            categoria TEXT,
            preco REAL NOT NULL,
            img TEXT,
            pagina TEXT NOT NULL
        )
    `;
    db.run(sqlCreateTable, (err) => {
        if (err) return console.error("Erro ao criar tabela:", err.message);
        console.log("Tabela 'produtos' criada ou já existente.");

        const sqlInsert = `INSERT INTO produtos (nome, categoria, preco, img, pagina) VALUES (?, ?, ?, ?, ?)`;
        produtos.forEach(p => {
            db.run(sqlInsert, [p.nome, p.categoria, p.preco, p.img, p.pagina], function(err) {
                if (err) return console.error("Erro ao inserir produto:", err.message);
            });
        });

        console.log(`${produtos.length} produtos inseridos com sucesso.`);
    });

    
    const sqlCreateUsersTable = `
        CREATE TABLE IF NOT EXISTS usuarios (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome_completo TEXT NOT NULL,
            cpf TEXT UNIQUE NOT NULL,
            email TEXT UNIQUE NOT NULL,
            senha_hash TEXT NOT NULL
        )
    `;
    db.run(sqlCreateUsersTable, (err) => {
        if (err) return console.error("Erro ao criar tabela de usuários:", err.message);
        console.log("Tabela 'usuarios' criada ou já existente.");
    });
});
