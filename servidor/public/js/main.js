document.addEventListener('DOMContentLoaded', () => {
    const paginaAtual = window.location.pathname.split('/').pop().replace('.html', '');

    const paginasDeProduto = ['colecao', 'calcados', 'masculino', 'feminino'];

    if (paginasDeProduto.includes(paginaAtual)) {
        const apiUrl = `/api/produtos/${paginaAtual}`;
        renderizarProdutos(apiUrl, 'grade-produtos-container');
    }
});

async function renderizarProdutos(urlDaApi, idDoContainer) {
    const container = document.getElementById(idDoContainer);
    if (!container) return;

    try {
        const response = await fetch(urlDaApi);
        if (!response.ok) throw new Error('Não foi possível buscar os dados.');
        
        const produtos = await response.json();
        container.innerHTML = '';

        if (produtos.length === 0) {
            container.innerHTML = '<p>Nenhum produto encontrado.</p>';
            return;
        }

        produtos.forEach(produto => {
            const cartao = document.createElement('div');
            cartao.className = 'cartao-produto';
            cartao.innerHTML = `
                <img src="${produto.img}" alt="${produto.nome}">
                <h3>${produto.nome}</h3>
                <p class="categoria-produto">${produto.categoria}</p>
                <p class="preco-produto">R$ ${produto.preco.toFixed(2).replace('.', ',')}</p>
            `;
            container.appendChild(cartao);
        });
    } catch (error) {
        console.error('Erro ao renderizar produtos:', error);
        container.innerHTML = '<p>Erro ao carregar os produtos. Tente novamente.</p>';
    }
}