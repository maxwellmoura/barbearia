function clickMenu() {
    const menuItens = document.getElementById("menuItens");
    if (menuItens.style.display === "block") {
        menuItens.style.display = "none";
    } else {
        menuItens.style.display = "block";
    }
}

// Código para compra e armazenamento dos produtos no carrinho
document.addEventListener("DOMContentLoaded", () => {
    const comprarButtons = document.querySelectorAll(".comprar");
    const quantidadeDialog = document.getElementById("quantidade-dialog");
    const quantidadeInput = document.getElementById("quantidade");
    const adicionarAoCarrinhoButton = document.getElementById("adicionar-ao-carrinho");
    const cancelarButton = document.getElementById("cancelar");
    let produtoSelecionado = null;

    if (comprarButtons.length === 0) {
        console.warn("Nenhum botão de compra encontrado.");
        return;
    }

    comprarButtons.forEach(button => {
        button.addEventListener("click", () => {
            const produtoElemento = button.closest(".produtos");
            if (!produtoElemento) {
                console.error("Erro: Elemento do produto não encontrado.");
                return;
            }

            const nomeProduto = produtoElemento.querySelector("h2")?.textContent || "Produto sem nome";
            let precoProduto = produtoElemento.querySelector(".preco")?.textContent || "R$ 0,00";
            precoProduto = parseFloat(precoProduto.replace("R$", "").replace(",", ".").trim());

            const imagemProduto = produtoElemento.querySelector("img")?.src || "";

            produtoSelecionado = { nome: nomeProduto, preco: precoProduto, imagem: imagemProduto };
            quantidadeInput.value = 1; // Sempre inicia com quantidade 1
            quantidadeDialog.style.display = "block";
        });
    });

    if (adicionarAoCarrinhoButton) {
        adicionarAoCarrinhoButton.addEventListener("click", () => {
            const quantidade = parseInt(quantidadeInput.value);
            if (isNaN(quantidade) || quantidade <= 0) {
                alert("Por favor, insira uma quantidade válida.");
                return;
            }

            produtoSelecionado.quantidade = quantidade;
            adicionarAoCarrinho(produtoSelecionado);

            // Fecha a caixa de diálogo após adicionar o produto
            quantidadeDialog.style.display = "none";
        });
    } else {
        console.warn("Botão 'Adicionar ao Carrinho' não encontrado.");
    }

    if (cancelarButton) {
        cancelarButton.addEventListener("click", () => {
            quantidadeDialog.style.display = "none";
        });
    } else {
        console.warn("Botão 'Cancelar' não encontrado.");
    }
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
