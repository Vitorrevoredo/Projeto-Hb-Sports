document.addEventListener('DOMContentLoaded', () => {
    function criarCardProduto(produto) {
        return `
            <div class="cartao-produto">
                <img src="${produto.img}" alt="${produto.nome}">
                <h3>${produto.nome}</h3>
                <p class="categoria-produto">${produto.categoria}</p>
                <p class="preco-produto">R$ ${produto.preco.toFixed(2).replace('.', ',')}</p>
            </div>
        `;
    }

    function renderizarProdutos(produtos, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        if (produtos.length === 0) {
            container.innerHTML = '<p>Nenhum produto encontrado.</p>';
            return;
        }

        container.innerHTML = produtos.map(criarCardProduto).join('');
    }

    async function carregarProdutos() {
        try {
            const colecaoResp = await fetch('/api/produtos/colecao');
            if (!colecaoResp.ok) throw new Error('Falha ao buscar produtos da coleção');
            const colecaoProdutos = await colecaoResp.json();

            // Home.html usa esses dois containers
            renderizarProdutos(colecaoProdutos.slice(0, 4), 'principais-itens-grid');
            renderizarProdutos(colecaoProdutos.slice(4, 8), 'mais-produtos-grid');

        } catch (error) {
            console.error('Erro ao carregar produtos:', error);
            const containers = document.querySelectorAll('.grade-produtos');
            containers.forEach(container => {
                container.innerHTML = '<p>Erro ao carregar produtos. Tente novamente mais tarde.</p>';
            });
        }
    }

    carregarProdutos();
});
