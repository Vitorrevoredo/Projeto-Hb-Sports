document.addEventListener('DOMContentLoaded', () => {
    let todosOsProdutosDaPagina = [];
    const container = document.getElementById('grade-produtos-container');

    // --- LÓGICA DO CARRINHO ---
    const getCarrinho = () => JSON.parse(localStorage.getItem('carrinho')) || [];

    const salvarCarrinho = (carrinho) => {
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
        atualizarContadorCarrinho();
    };
    const adicionarAoCarrinho = async (idProduto) => {
        const botao = document.querySelector(`.botao-adicionar-carrinho[data-produto-id="${idProduto}"]`);

        try {
            if (botao) {
                botao.disabled = true;
                botao.textContent = 'Adicionando...';
            }

            const response = await fetch(`/api/produtos/item/${idProduto}`);
            if (!response.ok) throw new Error('Produto não encontrado');
            const produtoParaAdicionar = await response.json();

            let carrinho = getCarrinho();
            const itemExistente = carrinho.find(item => item.id === produtoParaAdicionar.id);

            if (itemExistente) {
                itemExistente.quantidade++;
            } else {
                carrinho.push({ ...produtoParaAdicionar, quantidade: 1 });
            }

            salvarCarrinho(carrinho);

            if (botao) {
                botao.textContent = 'Adicionado!';

                // NOVO: Faz o botão voltar ao normal depois de 1.5 segundos
                setTimeout(() => {
                    botao.textContent = 'Adicionar ao Carrinho';
                    botao.disabled = false;
                }, 1500);
            }
        } catch (error) {
            console.error("Erro ao adicionar produto:", error);
            if (botao) {
                botao.textContent = 'Erro!';
                // Reseta também em caso de erro
                setTimeout(() => {
                    botao.textContent = 'Adicionar ao Carrinho';
                    botao.disabled = false;
                }, 2000);
            }
        }
    };
   const atualizarContadorCarrinho = () => {
    const contadores = document.querySelectorAll('.contagem-carrinho');
    const carrinho = getCarrinho();
    const totalItens = carrinho.reduce((total, item) => total + item.quantidade, 0);
    contadores.forEach(contador => {
        contador.textContent = totalItens;
        contador.dataset.count = totalItens;
    });
};


    // --- RENDERIZAÇÃO E FILTROS ---
    const renderizarGradeDeProdutos = (listaDeProdutos) => {
        const containerProdutos =
            document.getElementById('grade-produtos-container') ||
            document.getElementById('principais-itens-grid') ||
            document.getElementById('mais-produtos-grid');
        if (!containerProdutos) return;

        if (!listaDeProdutos || listaDeProdutos.length === 0) {
            containerProdutos.innerHTML = `<p>Nenhum produto encontrado com os filtros selecionados.</p>`;
            return;
        }

        containerProdutos.innerHTML = listaDeProdutos.map(produto => {
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
    };

    const aplicarFiltrosEOrdenar = () => {
        const categorias = Array.from(document.querySelectorAll('#filtro-categoria input:checked')).map(cb => cb.value);
        const marcas = Array.from(document.querySelectorAll('#filtro-marca input:checked')).map(cb => cb.value);
        const precoMin = parseFloat(document.getElementById('precoMin').value);
        const precoMax = parseFloat(document.getElementById('precoMax').value);
        const ordenacao = document.getElementById('seletor-ordenacao').value;

        let produtosFiltrados = todosOsProdutosDaPagina.filter(produto => {
            const categoriaMatch = categorias.length === 0 || categorias.includes(produto.categoria);
            const marcaMatch = marcas.length === 0 || marcas.includes(produto.marca);
            const precoMatch = produto.preco >= precoMin && produto.preco <= precoMax;
            return categoriaMatch && marcaMatch && precoMatch;
        });

        switch (ordenacao) {
            case 'preco-asc':
                produtosFiltrados.sort((a, b) => a.preco - b.preco);
                break;
            case 'preco-desc':
                produtosFiltrados.sort((a, b) => b.preco - a.preco);
                break;
        }

        renderizarGradeDeProdutos(produtosFiltrados);
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
            // NOVO: Seleciona os botões de ação
            btnAddCarrinho: document.getElementById('destaque-btn-add-carrinho'),
            btnComprarAgora: document.getElementById('destaque-btn-comprar-agora')
        };

        if (!elementos.imagem || !produtos || produtos.length === 0) return;

        function atualizarSlider() {
            const produto = produtos[indiceAtual];
            elementos.nome.textContent = produto.nome;
            elementos.preco.textContent = `R$ ${produto.preco.toFixed(2).replace('.', ',')}`;
            elementos.imagem.src = produto.img;

            // ATUALIZA O ID DO PRODUTO NO BOTÃO
            // Isso é crucial para a lógica do carrinho saber qual produto adicionar
            if (elementos.btnAddCarrinho) {
                elementos.btnAddCarrinho.dataset.produtoId = produto.id;
            }

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

        // NOVO: Adiciona a função de 'Comprar Agora'
        elementos.btnComprarAgora.addEventListener('click', () => {
            const produtoAtualId = produtos[indiceAtual].id;
            // A função adicionarAoCarrinho já existe no seu script
            adicionarAoCarrinho(produtoAtualId);
            // Redireciona para a página do carrinho
            window.location.href = 'carrinho.html';
        });

        atualizarSlider();
    };
    // --- CARREGAMENTO INICIAL ---
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
                if (!response.ok) throw new Error(`Falha ao buscar produtos.`);
                todosOsProdutosDaPagina = await response.json();
                renderizarGradeDeProdutos(todosOsProdutosDaPagina);
            }
        } catch (error) {
            console.error('Erro:', error);
            if (container) container.innerHTML = '<p>Erro ao carregar os produtos.</p>';
        }

        atualizarContadorCarrinho();
    };

    // EVENTOS
    document.body.addEventListener('click', (event) => {
        const botao = event.target.closest('.botao-adicionar-carrinho');
        if (botao) {
            const idProduto = botao.dataset.produtoId;
            adicionarAoCarrinho(idProduto);
        }
    });

    const btnAplicarFiltros = document.getElementById('aplicar-filtros');
    if (btnAplicarFiltros) {
        btnAplicarFiltros.addEventListener('click', aplicarFiltrosEOrdenar);
    }

    const seletorOrdenacao = document.getElementById('seletor-ordenacao');
    if (seletorOrdenacao) {
        seletorOrdenacao.addEventListener('change', aplicarFiltrosEOrdenar);
    }

    // INICIAR A PÁGINA
    carregarPagina();
});
