document.addEventListener('DOMContentLoaded', () => {
    function getCart() {
        return JSON.parse(localStorage.getItem('carrinho')) || [];
    }

    function saveCart(cart) {
        localStorage.setItem('carrinho', JSON.stringify(cart));
        updateCartCounter();
    }

    function updateCartCounter() {
        const cart = getCart();
        const cartCounters = document.querySelectorAll('.contagem-carrinho');
        if (cartCounters.length > 0) {
            const totalItems = cart.reduce((sum, item) => sum + item.quantidade, 0);
            cartCounters.forEach(counter => {
                counter.textContent = totalItems;
                counter.dataset.count = totalItems;
            });
        }
    }

    document.body.addEventListener('click', async (event) => {
        const botaoAdicionar = event.target.closest('.botao-adicionar-carrinho');
        if (botaoAdicionar) {
            event.preventDefault();
            const produtoId = botaoAdicionar.dataset.produtoId;

            if (botaoAdicionar.disabled) return;
            botaoAdicionar.disabled = true;
            botaoAdicionar.textContent = 'Adicionando...';

            try {
                const response = await fetch(`/api/produtos/item/${produtoId}`);
                if (!response.ok) throw new Error('Produto não encontrado');
                const produto = await response.json();
                
                const cart = getCart();
                const itemExistente = cart.find(item => item.id === produto.id);

                if (itemExistente) {
                    itemExistente.quantidade++;
                } else {
                    cart.push({ ...produto, quantidade: 1 });
                }

                saveCart(cart);
                botaoAdicionar.textContent = 'Adicionado!';

                setTimeout(() => {
                    botaoAdicionar.textContent = 'Adicionar ao Carrinho';
                    botaoAdicionar.disabled = false;
                }, 1500);

            } catch (error) {
                console.error('Erro ao adicionar produto:', error);
                botaoAdicionar.textContent = 'Erro!';
                setTimeout(() => {
                    botaoAdicionar.disabled = false;
                    botaoAdicionar.textContent = 'Adicionar ao Carrinho';
                }, 2000);
            }
        }
    });

    updateCartCounter();
});
