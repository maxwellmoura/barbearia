function clickMenu() {
    if (menuItens.style.display == 'block') {
        menuItens.style.display = 'none'
    } else {
        menuItens.style.display = 'block'
    }
}
//Codigo pro estoque e pagamento dos produtos
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
            const precoProduto = produtoElemento.querySelector(".preco").textContent;
            const imagemProduto = produtoElemento.querySelector("img").src; 

            produtoSelecionado = { nome: nomeProduto, preco: precoProduto, imagem: imagemProduto };
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
document.addEventListener("DOMContentLoaded", () => {
    const produtos = document.querySelectorAll(".produtos");
    let listaProdutos = [];

    produtos.forEach(produto => {
        const nome = produto.querySelector("h2").innerText.trim();
        let precoTexto = produto.querySelector(".preco").innerText.trim();
        precoTexto = precoTexto.replace("R$", "").replace(",", ".").trim();
        const preco = parseFloat(precoTexto);

        listaProdutos.push({ nome, preco });
    });

    localStorage.setItem("precosProdutos", JSON.stringify(listaProdutos));
});