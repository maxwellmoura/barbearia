document.addEventListener("DOMContentLoaded", () => {
    // Recupera os dados do localStorage
    const agendamento = JSON.parse(localStorage.getItem("agendamento"));

    if (agendamento) {
        document.querySelector("p:nth-of-type(1)").innerHTML = `<strong>Nome:</strong> ${agendamento.nome}`;
        document.querySelector("p:nth-of-type(2)").innerHTML = `<strong>Horário:</strong> ${agendamento.horario}`;
        document.querySelector("p:nth-of-type(3)").innerHTML = `<strong>Dia:</strong> ${agendamento.diaSemana}`;
        document.querySelector("p:nth-of-type(4)").innerHTML = `<strong>Barbeiro:</strong> ${agendamento.barbeiro}`;
        document.querySelector("p:nth-of-type(5)").innerHTML = `<strong>Serviço:</strong> ${agendamento.servico}`;
    } else {
        document.querySelector("main").innerHTML = "<h1>Nenhum agendamento encontrado!</h1>";
    }

    // Botão para voltar à página inicial
    document.getElementById("voltar").addEventListener("click", () => {
        window.location.href = "./agenda.html";
    });
});
