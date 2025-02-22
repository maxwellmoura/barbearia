document.addEventListener("DOMContentLoaded", () => {
    exibirCarrinho();
});

function exibirCarrinho() {
    const carrinhoContainer = document.getElementById("carrinho-container");
    const totalContainer = document.getElementById("total");
    if (!carrinhoContainer || !totalContainer) return;

    const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    carrinhoContainer.innerHTML = "";
    let total = 0;

    if (carrinho.length === 0) {
        carrinhoContainer.innerHTML = "<p>O carrinho está vazio.</p>";
        totalContainer.innerHTML = "<p>Total: R$ 0,00</p>";
        return;
    }

    carrinho.forEach((produto, index) => {
        const item = document.createElement("div");
        item.classList.add("carrinho-item");

        const precoUnitario = produto.preco; // Agora pega direto do produto armazenado
        const precoTotalProduto = precoUnitario * produto.quantidade;
        total += precoTotalProduto;

        item.innerHTML = `
            <div class="carrinho-produto">
                <img src="${produto.imagem}" alt="${produto.nome}" class="carrinho-imagem">
                <p>${produto.quantidade}x ${produto.nome} - R$ ${precoTotalProduto.toFixed(2)}</p>
                <button class="remover-item" data-index="${index}">Remover</button>
            </div>
        `;
        carrinhoContainer.appendChild(item);
    });

    totalContainer.innerHTML = `<h3>Total: R$ ${total.toFixed(2)}</h3>`;

    // Armazena o total no localStorage para ser usado na finalização
    localStorage.setItem("totalProdutos", total.toFixed(2));

    document.querySelectorAll(".remover-item").forEach(botao => {
        botao.addEventListener("click", (event) => {
            const index = event.target.getAttribute("data-index");
            removerDoCarrinho(index);
        });
    });
}

function removerDoCarrinho(index) {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    carrinho.splice(index, 1);
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    exibirCarrinho();
}

// Removida a função buscarPrecoDoProduto() pois agora o preço já vem armazenado no produto

document.addEventListener("DOMContentLoaded", () => {
    exibirCarrinho();

    document.getElementById("finalizar-compra").addEventListener("click", () => {
        window.location.href = "./finalizacao.html";
    });

    document.getElementById("limpar-carrinho").addEventListener("click", () => {
        localStorage.removeItem("carrinho");
        exibirCarrinho();
        alert("Carrinho limpo com sucesso!");
    });
});
