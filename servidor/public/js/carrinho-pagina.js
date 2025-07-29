document.addEventListener('DOMContentLoaded', () => {
    const listaCarrinhoEl = document.getElementById('lista-carrinho');
    const subtotalEl = document.getElementById('subtotal-valor');
    const totalEl = document.getElementById('total-valor');
    const btnFinalizar = document.querySelector('.botao-finalizar-compra');

    function getCart() {
        return JSON.parse(localStorage.getItem('shoppingCart')) || [];
    }

    function saveCart(cart) {
        localStorage.setItem('shoppingCart', JSON.stringify(cart));
        renderizarCarrinho(); // Re-renderiza tudo para refletir as mudanças
        updateGlobalCartCounter(); 
    }

    function updateGlobalCartCounter() {
        const cart = getCart();
        const cartCounters = document.querySelectorAll('.contagem-carrinho');
        const totalItems = cart.reduce((sum, item) => sum + item.quantidade, 0);
        cartCounters.forEach(counter => {
            counter.textContent = totalItems;
            counter.dataset.count = totalItems;
        });
    }
    
    function renderizarCarrinho() {
        const cart = getCart();
        listaCarrinhoEl.innerHTML = '';

        if (cart.length === 0) {
            listaCarrinhoEl.innerHTML = '<h2>Seu carrinho está vazio.</h2><p>Adicione produtos de nossas coleções para vê-los aqui!</p>';
            atualizarResumo(0);
            btnFinalizar.disabled = true; // Desativa o botão se o carrinho estiver vazio
            return;
        }

        btnFinalizar.disabled = false;
        let subtotal = 0;

        cart.forEach(item => {
            const itemTotal = item.preco * item.quantidade;
            subtotal += itemTotal;
            
            const itemEl = document.createElement('div');
            itemEl.className = 'item-carrinho';
            itemEl.innerHTML = `
                <img src="${item.img}" alt="${item.nome}">
                <div class="detalhes-item">
                    <h3>${item.nome}</h3>
                    <p>${item.categoria}</p>
                    <div class="controle-quantidade">
                        <button class="diminuir-qtd" data-id="${item.id}">-</button>
                        <span>${item.quantidade}</span>
                        <button class="aumentar-qtd" data-id="${item.id}">+</button>
                    </div>
                </div>
                <span class="preco-item">R$ ${itemTotal.toFixed(2).replace('.', ',')}</span>
                <button class="botao-remover" data-id="${item.id}" title="Remover item"><i class="fas fa-trash-alt"></i></button>
            `;
            listaCarrinhoEl.appendChild(itemEl);
        });
        
        atualizarResumo(subtotal);
    }
    
    function atualizarResumo(subtotal) {
        subtotalEl.textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
        totalEl.textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
    }

    listaCarrinhoEl.addEventListener('click', (e) => {
        const cart = getCart();
        const button = e.target.closest('button');
        if (!button) return;

        const id = parseInt(button.dataset.id);
        const item = cart.find(i => i.id === id);
        if (!item) return;

        if (button.classList.contains('aumentar-qtd')) {
            item.quantidade++;
        } else if (button.classList.contains('diminuir-qtd')) {
            if (item.quantidade > 1) {
                item.quantidade--;
            } else {
                const itemIndex = cart.findIndex(i => i.id === id);
                cart.splice(itemIndex, 1);
            }
        } else if (button.classList.contains('botao-remover')) {
            const itemIndex = cart.findIndex(i => i.id === id);
            cart.splice(itemIndex, 1);
        }
        
        saveCart(cart);
    });

    btnFinalizar.addEventListener('click', () => {
        const cart = getCart();
        if (cart.length > 0) {
            alert('Compra finalizada com sucesso! (Esta é uma simulação)');
            // Limpa o carrinho
            saveCart([]);
        }
    });

    renderizarCarrinho();
    updateGlobalCartCounter();
});