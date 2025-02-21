document.addEventListener("DOMContentLoaded", () => {
    // Puxar valor total dos produtos do localStorage
    const totalProdutos = JSON.parse(localStorage.getItem("carrinho"))?.reduce((acc, item) => acc + item.preco * item.quantidade, 0) || 0;
    document.getElementById("valor-produto").value = `R$ ${totalProdutos.toFixed(2)}`;

    // Evento para calcular frete quando digitar o CEP
    document.getElementById("cep").addEventListener("blur", calcularFrete);
});

async function calcularFrete() {
    const cepDestino = document.getElementById("cep").value.replace(/\D/g, "");
    const cepOrigem = "62030480";

    if (cepDestino.length !== 8) {
        alert("CEP inválido! Digite um CEP com 8 dígitos.");
        return;
    }

    try {
        // Busca o endereço do destino no ViaCEP
        const responseDestino = await fetch(`https://viacep.com.br/ws/${cepDestino}/json/`);
        const destinoData = await responseDestino.json();

        if (destinoData.erro) {
            alert("CEP de destino não encontrado!");
            return;
        }

        document.getElementById("rua").value = destinoData.logradouro;
        document.getElementById("bairro").value = destinoData.bairro;
        document.getElementById("cidade").value = destinoData.localidade;
        document.getElementById("estado").value = destinoData.uf;

        // Busca o endereço da origem no ViaCEP
        const responseOrigem = await fetch(`https://viacep.com.br/ws/${cepOrigem}/json/`);
        const origemData = await responseOrigem.json();

        if (origemData.erro) {
            alert("CEP de origem inválido!");
            return;
        }

        // Cálculo do frete baseado em faixas de distância
        const distancia = calcularDistanciaAproximada(origemData.uf, destinoData.uf);
        let valorFrete = 0;

        if (distancia <= 300) {
            valorFrete = 20;
        } else if (distancia <= 1000) {
            valorFrete = 50;
        } else if (distancia <= 2000) {
            valorFrete = 90;
        } else {
            valorFrete = 150;
        }

        document.getElementById("valor-frete").value = `R$ ${valorFrete.toFixed(2)}`;

        const totalProdutos = parseFloat(document.getElementById("valor-produto").value.replace("R$ ", "")) || 0;
        const totalFinal = totalProdutos + valorFrete;
        document.getElementById("total").value = `R$ ${totalFinal.toFixed(2)}`;
    } catch (error) {
        alert("Erro ao calcular o frete. Tente novamente.");
        console.error("Erro:", error);
    }
}

// Função para estimar distância entre estados
function calcularDistanciaAproximada(ufOrigem, ufDestino) {
    const distancias = {
        "CE": { "CE": 10, "SP": 2800, "RJ": 2500, "BA": 1500, "PE": 800 },
        "SP": { "CE": 2800, "SP": 10, "RJ": 400, "BA": 1700, "PE": 2100 },
        "RJ": { "CE": 2500, "SP": 400, "RJ": 10, "BA": 1600, "PE": 1900 },
    };

    return distancias[ufOrigem]?.[ufDestino] || 1000; // Se não encontrar, assume 1000 km
}
