document.addEventListener('DOMContentLoaded', () => {

    const contagemCarrinhoElemento = document.querySelector('.contagem-carrinho');
    let itensNoCarrinho = 0; 

    document.body.addEventListener('click', (event) => {
        

        if (event.target.classList.contains('botao-adicionar-carrinho')) {
            const botao = event.target;

            if (botao.disabled) {
                return;
            }

            itensNoCarrinho++;
            atualizarContagemCarrinho();

            botao.disabled = true;
            botao.textContent = 'Adicionado!';

            animarIconeCarrinho();
        }
    });

    function atualizarContagemCarrinho() {
        contagemCarrinhoElemento.textContent = itensNoCarrinho;
        contagemCarrinhoElemento.dataset.count = itensNoCarrinho;
    }

    function animarIconeCarrinho() {
        contagemCarrinhoElemento.style.transform = 'scale(1.25)';
        setTimeout(() => {
            contagemCarrinhoElemento.style.transform = 'scale(1)';
        }, 200);
    }
});