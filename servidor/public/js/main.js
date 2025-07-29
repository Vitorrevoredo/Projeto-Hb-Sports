document.addEventListener('DOMContentLoaded', () => {

    const renderizarGradeDeProdutos = (listaDeProdutos, idDoContainer) => {
        const container = document.getElementById(idDoContainer);
        if (!container) return;

        if (!listaDeProdutos || listaDeProdutos.length === 0) {
            container.innerHTML = `<p>Nenhum produto encontrado.</p>`;
            return;
        }

        container.innerHTML = listaDeProdutos.map(produto => `
            <a href="produto.html?id=${produto.id}" class="cartao-produto-link">
                <div class="cartao-produto">
                    <img src="${produto.img}" alt="${produto.nome}">
                    <h3>${produto.nome}</h3>
                    <p class="categoria-produto">${produto.categoria}</p>
                    <p class="preco-produto">R$ ${produto.preco.toFixed(2).replace('.', ',')}</p>
                    <button class="botao-adicionar-carrinho" data-produto-id="${produto.id}">Adicionar ao Carrinho</button>
                </div>
            </a>
        `).join('');
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
                const [destaqueResp, principaisResp, maisResp] = await Promise.all([
                    fetch('/api/produtos/calcados'),
                    fetch('/api/produtos/feminino'),
                    fetch('/api/produtos/masculino')
                ]);

                if (!destaqueResp.ok || !principaisResp.ok || !maisResp.ok) throw new Error('Falha ao buscar produtos para a página inicial.');
                
                const destaqueProdutos = await destaqueResp.json();
                const principaisProdutos = await principaisResp.json();
                const maisProdutos = await maisResp.json();

                iniciarSliderDestaque(destaqueProdutos.slice(0, 3));
                renderizarGradeDeProdutos(principaisProdutos.slice(0, 4), 'principais-itens-grid');
                renderizarGradeDeProdutos(maisProdutos.slice(0, 4), 'mais-produtos-grid');

            } else if (paginasDeProduto.includes(paginaAtual)) {
                const response = await fetch(`/api/produtos/${paginaAtual}`);
                if (!response.ok) throw new Error(`Falha ao buscar produtos para ${paginaAtual}.`);
                const produtosDaPagina = await response.json();
                renderizarGradeDeProdutos(produtosDaPagina, 'grade-produtos-container');
            }
        } catch (error) {
            console.error('Erro ao carregar e renderizar produtos:', error);
            document.querySelectorAll('.grade-produtos').forEach(container => {
                container.innerHTML = '<p>Erro ao carregar os produtos.</p>';
            });
        }
    };

    carregarPagina();
});