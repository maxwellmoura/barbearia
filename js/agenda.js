document.getElementById("form-agendamento").addEventListener("submit", function (event) {
    event.preventDefault(); // Evita o recarregamento da página

    // Captura os valores preenchidos
    const nome = document.getElementById("name").value;
    const horario = document.getElementById("horarios").value;
    let diaSemana = document.getElementById("diaDaSemana").value.trim();
    const barbeiro = document.getElementById("barbeiros").value;
    const servico = document.getElementById("servico").value;

    // Normaliza o nome do dia da semana (para evitar erros de acentuação e formatação)
    const normalizarDia = (dia) => {
        const dias = {
            "segunda": "Segunda-feira", "terça": "Terça-feira", "quarta": "Quarta-feira", "quinta": "Quinta-feira",
            "sexta": "Sexta-feira", "sabado": "Sábado", "sábado": "Sábado", "domingo": "Domingo"
        };
        return dias[dia.toLowerCase()] || dia;
    };

    diaSemana = normalizarDia(diaSemana);
    console.log("Dia da semana selecionado:", diaSemana); // Depuração

    // Tabela de horários dos barbeiros
    const horariosBarbeiros = {
        "João": {
            "Segunda-feira": [9, 18], "Terça-feira": [9, 18], "Quarta-feira": [9, 18], "Quinta-feira": [9, 18], "Sexta-feira": [9, 18],
            "Sábado": [9, 14], "Domingo": null
        },
        "Luís": {
            "Segunda-feira": [10, 20], "Terça-feira": [10, 20], "Quarta-feira": [10, 20], "Quinta-feira": [10, 20], "Sexta-feira": [10, 20],
            "Sábado": [10, 18], "Domingo": [12, 18]
        },
        "Carlos": {
            "Segunda-feira": [9, 19], "Terça-feira": [9, 19], "Quarta-feira": [9, 19], "Quinta-feira": [9, 19], "Sexta-feira": [9, 19],
            "Sábado": [9, 15], "Domingo": null
        },
        "Pedro": {
            "Segunda-feira": [11, 21], "Terça-feira": [11, 21], "Quarta-feira": [11, 21], "Quinta-feira": [11, 21], "Sexta-feira": [11, 21],
            "Sábado": [11, 20], "Domingo": [14, 20]
        },
        "Marcelo": {
            "Segunda-feira": [10, 20], "Terça-feira": [10, 20], "Quarta-feira": [10, 20], "Quinta-feira": [10, 20], "Sexta-feira": [10, 20],
            "Sábado": [10, 19], "Domingo": null
        },
        "Leonardo": {
            "Segunda-feira": [9, 20], "Terça-feira": [9, 20], "Quarta-feira": [9, 20], "Quinta-feira": [9, 20], "Sexta-feira": [9, 20],
            "Sábado": [10, 19], "Domingo": [10, 12]
        },
        "Rafaela": {
            "Segunda-feira": [9, 19], "Terça-feira": [9, 19], "Quarta-feira": [9, 19], "Quinta-feira": [9, 19], "Sexta-feira": [9, 20],
            "Sábado": [10, 18], "Domingo": [12, 17]
        },
        "Gabriela": {
            "Segunda-feira": [10, 20], "Terça-feira": [10, 20], "Quarta-feira": [10, 20], "Quinta-feira": [10, 20], "Sexta-feira": [10, 21],
            "Sábado": [11, 20], "Domingo": [14, 18]
        }
    };

    // Converter horário para número inteiro
    const horaSelecionada = parseInt(horario.split(":")[0]);

    // Verificar se o barbeiro atende no dia e horário selecionado
    const horarioAtendimento = horariosBarbeiros[barbeiro]?.[diaSemana];

    if (!horarioAtendimento) {
        alert(`O barbeiro ${barbeiro} não atende neste dia (${diaSemana}).`);
        return;
    }

    if (horaSelecionada < horarioAtendimento[0] || horaSelecionada > horarioAtendimento[1]) {
        alert(`O barbeiro ${barbeiro} atende de ${horarioAtendimento[0]}h às ${horarioAtendimento[1]}h neste dia (${diaSemana}). Escolha outro horário.`);
        return;
    }

    // Armazena os dados no localStorage
    const agendamento = { nome, horario, diaSemana, barbeiro, servico };
    localStorage.setItem("agendamento", JSON.stringify(agendamento));

    // Redireciona para a página de confirmação
    window.location.href = "./agendado.html";
});
