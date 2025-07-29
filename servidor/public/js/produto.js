// public/js/produto.js
document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const produtoId = params.get('id');

    if (!produtoId) {
        document.querySelector('.principal-pagina-produto').innerHTML = '<h1>Produto não encontrado!</h1>';
        return;
    }

    const nomeEl = document.getElementById('nome-produto');
    const precoEl = document.getElementById('preco-produto');
    const imagemPrincipalEl = document.getElementById('imagem-principal');
    const miniaturasContainer = document.getElementById('miniaturas');

    fetch(`/api/produtos/item/${produtoId}`)
        .then(response => {
            if (!response.ok) throw new Error('Produto não encontrado no servidor');
            return response.json();
        })
        .then(produto => {
            document.title = produto.nome;
            nomeEl.textContent = produto.nome;
            precoEl.textContent = `R$ ${produto.preco.toFixed(2).replace('.', ',')}`;
            imagemPrincipalEl.src = produto.img;

            // --- AJUSTE IMPORTANTE AQUI ---
            const botaoAdicionar = document.getElementById('btn-adicionar-carrinho');
            if (botaoAdicionar) {
                botaoAdicionar.dataset.produtoId = produto.id;
            }
            // --- FIM DO AJUSTE ---

            const imagensGaleria = [
                produto.img,
                'assets/Variant 1 Purple.png',
                'assets/Variant 2 Green.png',
                'assets/Variant 3 Red.png',
                'assets/campus shoe.png'
            ];

            miniaturasContainer.innerHTML = '';
            imagensGaleria.forEach((imgSrc, index) => {
                const img = document.createElement('img');
                img.src = imgSrc;
                img.className = 'miniatura';
                if (index === 0) img.classList.add('ativa');

                img.addEventListener('click', () => {
                    imagemPrincipalEl.src = imgSrc;
                    document.querySelector('.miniatura.ativa').classList.remove('ativa');
                    img.classList.add('ativa');
                });

                miniaturasContainer.appendChild(img);
            });
        })
        .catch(error => {
            console.error('Erro ao carregar produto:', error);
            document.querySelector('.principal-pagina-produto').innerHTML = '<h1>Erro ao carregar o produto.</h1>';
        });
});
