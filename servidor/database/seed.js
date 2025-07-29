const db = require('./db.js');

const produtosIniciais = [
    { nome: "Sandália Feminina Velisa", categoria: "Casual", preco: 149.99, img: "assets/sandalia fem coleção.png", pagina: "colecao" },
    { nome: "Sandália Masculina Couro Torven", categoria: "Casual", preco: 249.90, img: "assets/sandalia masc coleção.png", pagina: "colecao" },
    { nome: "Tênis Casual Feminino Nivora", categoria: "Casual", preco: 279.50, img: "assets/tenis casual fem coleção.webp", pagina: "colecao" },
    { nome: "Tênis Casual Masculino Vorex", categoria: "Casual", preco: 189.90, img: "assets/tenis casual masc coleçao.webp", pagina: "colecao" },
    { nome: "Bota de Couro Feminina", categoria: "Botas", preco: 399.90, img: "assets/bota feminina.png", pagina: "colecao" },
    { nome: "Bota Tática Masculina", categoria: "Botas", preco: 450.00, img: "assets/bota mas coleção.png", pagina: "colecao" },
    { nome: "Jaqueta Esportiva Feminina", categoria: "Vestuário", preco: 299.99, img: "assets/jaqueta esportiva fem coleção.webp", pagina: "colecao" },
    { nome: "Jaqueta Esportiva Masculina", categoria: "Vestuário", preco: 319.99, img: "assets/jaqueta esportiva masc coleção.webp", pagina: "colecao" },
    { nome: "Nike Air Max SYSTM", categoria: "Corrida", preco: 349.99, img: "assets/tenis esportivo.png", pagina: "calcados" },
    { nome: "Jordan Series ES", categoria: "Casual", preco: 599.00, img: "assets/jordan es.png", pagina: "calcados" },
    { nome: "Adidas Orange", categoria: "Casual", preco: 129.50, img: "assets/adidas orange.png", pagina: "calcados" },
    { nome: "Adidas Yeezy Boost 700", categoria: "Casual", preco: 450.00, img: "assets/Adidas Yeezy Boost 700.png", pagina: "calcados" },
    { nome: "Tênis Adidas Ultraboost 22", categoria: "Corrida", preco: 899.99, img: "assets/Tênis Adidas Ultraboost 22 Masculino Preto e Cinza.png", pagina: "calcados" },
    { nome: "Tênis Nike Air Force 1 Mid '07", categoria: "Casual", preco: 749.99, img: "assets/Tênis Nike Air Force 1 Mid '07 Branco e Preto.png", pagina: "calcados" },
    { nome: "Tênis Infantil Adidas FortaRun", categoria: "Infantil", preco: 199.99, img: "assets/Tênis Infantil Adidas FortaRun 2.0 com Velcro Preto.png", pagina: "calcados" },
    { nome: "Pharrell x NMD", categoria: "Casual", preco: 999.50, img: "assets/Pharrell x nmd.png", pagina: "calcados" },
    { nome: "Nike Air Force 1 Low Billie", categoria: "Casual", preco: 299.99, img: "assets/Air Force 1 Low Billie Tripe White.png", pagina: "masculino" },
    { nome: "Air Force 1 x Slam Jam", categoria: "Casual", preco: 320.00, img: "assets/Air Force 1 x Slam Jam.png", pagina: "masculino" },
    { nome: "Chuteira Society Nike", categoria: "Esportivo", preco: 299.00, img: "assets/chuteira masculina.png", pagina: "masculino" },
    { nome: "Camisa Dry-Fit Laranja", categoria: "Esportivo", preco: 99.90, img: "assets/dry fir laranja.png", pagina: "masculino" },
    { nome: "Shorts Masculino Preto", categoria: "Esportivo", preco: 129.90, img: "assets/shorts masculino.png", pagina: "masculino" },
    { nome: "Camiseta Nike Sportswear Azul", categoria: "Casual", preco: 179.99, img: "assets/produto camiseta azul.png", pagina: "masculino" },
    { nome: "Tênis Adidas Campus", categoria: "Casual", preco: 550.00, img: "assets/campus shoe.png", pagina: "masculino" },
    { nome: "Camisa Dry Fit Verde", categoria: "Esportivo", preco: 89.90, img: "assets/dry fit.png", pagina: "masculino" },
    { nome: "Tênis Lumera Preto", categoria: "Casual", preco: 249.99, img: "assets/tenis preto feminino.png", pagina: "feminino" },
    { nome: "Tênis Corrida Zyntrax", categoria: "Esportivo", preco: 429.50, img: "assets/tenis feminino colorido.png", pagina: "feminino" },
    { nome: "Tênis Casual Branco", categoria: "Casual", preco: 199.90, img: "assets/tenis branco feminino.png", pagina: "feminino" },
    { nome: "Camisa Polo Victory Lilás", categoria: "Esportivo", preco: 120.00, img: "assets/Camisa Polo Nike Dri-FIT Victory Feminina Lilás.png", pagina: "feminino" },
    { nome: "Calça Legging Nike Go com Bolso", categoria: "Esportivo", preco: 110.00, img: "assets/Calça Legging Nike Go Dri-FIT com Bolso Feminina Verde-água.png", pagina: "feminino" },
    { nome: "Regata NikeCourt Victory Rosa", categoria: "Esportivo", preco: 139.99, img: "assets/Regata NikeCourt Dri-FIT Victory Feminina Rosa.png", pagina: "feminino" },
    { nome: "Calça Legging Yoga Estampada", categoria: "Esportivo", preco: 229.99, img: "assets/Calça Legging Nike Yoga Dri-FIT 78 Estampada Azul.png", pagina: "feminino" },
    { nome: "Blusa Manga Longa Nike ADV", categoria: "Corrida", preco: 279.99, img: "assets/Blusa Manga Longa Nike Dri-FIT ADV Run Division Feminina.png", pagina: "feminino" }
];

db.serialize(() => {
    const sqlCreateTableProdutos = `
        CREATE TABLE IF NOT EXISTS produtos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            categoria TEXT,
            preco REAL NOT NULL,
            img TEXT,
            pagina TEXT NOT NULL
        )
    `;
    db.run(sqlCreateTableProdutos, (err) => {
        if (err) return console.error("Erro ao criar tabela 'produtos':", err.message);
        console.log("Tabela 'produtos' verificada/criada com sucesso.");

        db.get("SELECT COUNT(*) as count FROM produtos", (err, row) => {
            if (err) return console.error("Erro ao contar produtos:", err.message);

            if (row.count === 0) {
                console.log("Banco de dados de produtos vazio. Inserindo dados iniciais...");
                const sqlInsert = `INSERT INTO produtos (nome, categoria, preco, img, pagina) VALUES (?, ?, ?, ?, ?)`;
                
                produtosIniciais.forEach(p => {
                    db.run(sqlInsert, [p.nome, p.categoria, p.preco, p.img, p.pagina], function(err) {
                        if (err) return console.error("Erro ao inserir produto:", err.message);
                    });
                });
                console.log(`${produtosIniciais.length} produtos inseridos com sucesso.`);
            } else {
                console.log("O banco de dados já contém produtos. Nenhuma inserção foi feita.");
            }
        });
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
        console.log("Tabela 'usuarios' verificada/criada com sucesso.");
    });
});