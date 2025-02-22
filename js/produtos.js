document.addEventListener("DOMContentLoaded", () => {
    configurarMenu();
    configurarBotoesCompra();
});

function configurarMenu() {
    const menuButton = document.getElementById("menu");
    const menuItens = document.getElementById("menuItens");

    if (menuButton && menuItens) {
        menuButton.addEventListener("click", () => {
            menuItens.style.display = menuItens.style.display === "block" ? "none" : "block";
        });
    } else {
        console.error("Erro: Elementos do menu não encontrados.");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const comprarButtons = document.querySelectorAll(".comprar");
    const quantidadeDialog = document.getElementById("quantidade-dialog");
    const quantidadeInput = document.getElementById("quantidade");
    const adicionarAoCarrinhoButton = document.getElementById("adicionar-ao-carrinho");
    const cancelarButton = document.getElementById("cancelar");
    let produtoSelecionado = null;

    comprarButtons.forEach(button => {
        button.addEventListener("click", () => {
            const produtoElemento = button.closest(".produtos");
            const nomeProduto = produtoElemento.querySelector("h2").textContent;
            let precoProduto = produtoElemento.querySelector(".preco").textContent;
            precoProduto = parseFloat(precoProduto.replace("R$", "").replace(",", ".").trim());
            const imagemProduto = produtoElemento.querySelector("img").src;
            
            produtoSelecionado = { nome: nomeProduto, preco: precoProduto, imagem: imagemProduto };
            quantidadeInput.value = 1;
            quantidadeDialog.style.display = "block";
        });
    });

    adicionarAoCarrinhoButton.addEventListener("click", () => {
        const quantidade = parseInt(quantidadeInput.value);
        if (isNaN(quantidade) || quantidade <= 0) {
            alert("Por favor, insira uma quantidade válida.");
            return;
        }

        produtoSelecionado.quantidade = quantidade;
        adicionarAoCarrinho(produtoSelecionado);
        quantidadeDialog.style.display = "none";
    });

    cancelarButton.addEventListener("click", () => {
        quantidadeDialog.style.display = "none";
    });
});

function adicionarAoCarrinho(produto) {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    const produtoExistente = carrinho.find(item => item.nome === produto.nome);
    
    if (produtoExistente) {
        produtoExistente.quantidade += produto.quantidade;
    } else {
        carrinho.push(produto);
    }

    localStorage.setItem("carrinho", JSON.stringify(carrinho));
}
