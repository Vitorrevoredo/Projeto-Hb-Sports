// public/js/main.js
document.addEventListener('DOMContentLoaded', () => {

    const renderizarGradeDeProdutos = (listaDeProdutos, idDoContainer) => {
        const container = document.getElementById(idDoContainer);
        if (!container) return;

        if (!listaDeProdutos || listaDeProdutos.length === 0) {
            container.innerHTML = `<p>Nenhum produto encontrado.</p>`;
            return;
        }

        container.innerHTML = listaDeProdutos.map(produto => {
            const imagemSrc = produto.img ? produto.img : 'assets/placeholder.svg';

            return `
                <div class="cartao-produto">
                    <a href="produto.html?id=${produto.id}" class="cartao-produto-link-imagem">
                        <img src="${imagemSrc}" alt="${produto.nome}">
                    </a>
                    <div class="info-card-produto">
                        <h3>${produto.nome}</h3>
                        <p class="categoria-produto">${produto.categoria}</p>
                        <p class="preco-produto">R$ ${produto.preco.toFixed(2).replace('.', ',')}</p>
                        <button class="botao-adicionar-carrinho" data-produto-id="${produto.id}">Adicionar ao Carrinho</button>
                    </div>
                </div>
            `;
        }).join('');

        adicionarEventosAosBotoes();
    };

    const adicionarEventosAosBotoes = () => {
        const botoes = document.querySelectorAll('.botao-adicionar-carrinho');
        botoes.forEach(botao => {
            botao.addEventListener('click', () => {
                const idProduto = botao.dataset.produtoId;
                adicionarAoCarrinho(idProduto);
                atualizarContadorCarrinho();
            });
        });
    };

    const adicionarAoCarrinho = (idProduto) => {
        let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
        const produtoExistente = carrinho.find(item => item.id === idProduto);

        if (produtoExistente) {
            produtoExistente.quantidade += 1;
        } else {
            carrinho.push({ id: idProduto, quantidade: 1 });
        }

        localStorage.setItem('carrinho', JSON.stringify(carrinho));
    };

    const atualizarContadorCarrinho = () => {
        const contador = document.getElementById('contador-carrinho');
        const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
        const totalItens = carrinho.reduce((acc, item) => acc + item.quantidade, 0);
        if (contador) contador.textContent = totalItens;
    };

    const iniciarSliderDestaque = (produtos) => {
        let indiceAtual = 0;
        const elementos = {
            nome: document.getElementById('destaque-nome'),
            preco: document.getElementById('destaque-preco'),
            imagem: document.getElementById('destaque-imagem'),
            variantes: document.getElementById('destaque-variantes'),
            pontos: document.getElementById('destaque-pontos'),
            anterior: document.querySelector('.seta-anterior-destaque'),
            proximo: document.querySelector('.seta-proximo-destaque'),
        };

        if (!elementos.imagem) return;

        function atualizarSlider() {
            const produto = produtos[indiceAtual];
            elementos.nome.textContent = produto.nome;
            elementos.preco.textContent = `R$ ${produto.preco.toFixed(2).replace('.', ',')}`;
            elementos.imagem.src = produto.img;

            elementos.variantes.querySelectorAll('.miniatura-variante').forEach((miniatura, idx) => {
                miniatura.classList.toggle('miniatura-ativa', idx === indiceAtual);
            });
            elementos.pontos.querySelectorAll('.ponto').forEach((ponto, idx) => {
                ponto.classList.toggle('ponto-ativo', idx === indiceAtual);
            });
        }

        elementos.variantes.innerHTML = produtos.map((p, idx) => `<img src="${p.img}" class="miniatura-variante" data-indice="${idx}">`).join('');
        elementos.pontos.innerHTML = produtos.map((p, idx) => `<span class="ponto" data-indice="${idx}"></span>`).join('');

        elementos.anterior.addEventListener('click', () => {
            indiceAtual = (indiceAtual - 1 + produtos.length) % produtos.length;
            atualizarSlider();
        });

        elementos.proximo.addEventListener('click', () => {
            indiceAtual = (indiceAtual + 1) % produtos.length;
            atualizarSlider();
        });

        elementos.variantes.addEventListener('click', (e) => {
            if (e.target.matches('.miniatura-variante')) {
                indiceAtual = parseInt(e.target.dataset.indice);
                atualizarSlider();
            }
        });

        if (produtos.length > 0) {
            atualizarSlider();
        }
    };

    const carregarPagina = async () => {
        const paginaAtual = window.location.pathname.split('/').pop().replace('.html', '') || 'index';
        const paginasDeProduto = ['colecao', 'calcados', 'masculino', 'feminino'];

        try {
            if (paginaAtual === 'index') {
                const response = await fetch('/api/produtos');
                if (!response.ok) throw new Error('Falha ao buscar todos os produtos.');
                const todosProdutos = await response.json();

                iniciarSliderDestaque(todosProdutos.slice(0, 3));
                renderizarGradeDeProdutos(todosProdutos.slice(3, 7), 'principais-itens-grid');
                renderizarGradeDeProdutos(todosProdutos.slice(7, 11), 'mais-produtos-grid');

            } else if (paginasDeProduto.includes(paginaAtual)) {
                const response = await fetch(`/api/produtos/${paginaAtual}`);
                if (!response.ok) throw new Error(`Falha ao buscar produtos para ${paginaAtual}.`);
                const produtosDaPagina = await response.json();
                renderizarGradeDeProdutos(produtosDaPagina, 'grade-produtos-container');
            }

            atualizarContadorCarrinho();
        } catch (error) {
            console.error('Erro ao carregar e renderizar produtos:', error);
            document.querySelectorAll('.grade-produtos').forEach(container => {
                container.innerHTML = '<p>Erro ao carregar os produtos.</p>';
            });
        }
    };

    carregarPagina();
});
