document.addEventListener('DOMContentLoaded', () => {
    
    const paginaAtual = window.location.pathname.split('/').pop();
    

    const rotasApi = {
        'colecao.html': '/api/colecao',
        'calcados.html': '/api/calcados',
        'masculino.html': '/api/masculino',
        'feminino.html': '/api/feminino'
    };


    const apiUrl = rotasApi[paginaAtual];

    if (apiUrl) {

        renderizarProdutos(apiUrl, 'grade-produtos-container');
    }
});

/**
 * Busca dados da API e cria os cards de produtos na página.
 * @param {string} urlDaApi A rota da API que fornecerá os dados dos produtos.
 * @param {string} idDoContainer O ID do elemento HTML que abrigará os produtos.
 */
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
        container.innerHTML = '<p>Erro ao carregar os produtos. Tente novamente mais tarde.</p>';
    }
}