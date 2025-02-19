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

        const precoUnitario = buscarPrecoDoProduto(produto.nome);
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


function buscarPrecoDoProduto(nomeProduto) {
    const produtos = document.querySelectorAll(".produtos");
    
    for (let produto of produtos) {
        const nome = produto.querySelector("h2").innerText.trim();
        if (nome === nomeProduto) {
            let precoTexto = produto.querySelector(".preco").innerText.trim();
            precoTexto = precoTexto.replace("R$", "").replace(",", ".").trim();
            return parseFloat(precoTexto);
        }
    }
    return 0; 
}

document.addEventListener("DOMContentLoaded", () => {
    exibirCarrinho();

    document.getElementById("finalizar-compra").addEventListener("click", () => {
        alert("Vamos finalizar a compra!");
        
        window.location.href = "./finalizacao.html"; 
    });

    document.getElementById("limpar-carrinho").addEventListener("click", () => {
        localStorage.removeItem("carrinho");
        exibirCarrinho();
        alert("Carrinho limpo com sucesso!");
    });
});
function buscarPrecoDoProduto(nomeProduto) {
    const precos = JSON.parse(localStorage.getItem("precosProdutos")) || [];
    
    const produto = precos.find(p => p.nome === nomeProduto);
    return produto ? produto.preco : 0;
}
