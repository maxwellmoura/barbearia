const form = document.getElementById('form-contato');
const enviarForm = document.getElementById('enviar-form');
const mensagemSucesso = document.getElementById('mensagem-sucesso');
const mensagemErro = document.getElementById('mensagem-erro');

//Codigo pro Menu
function clickMenu() {
    if (menuItens.style.display == 'block') {
        menuItens.style.display = 'none'
    } else {
        menuItens.style.display = 'block'
    }
}
//Função pra direicionar para pagina agenda
function redirecionar() {
    window.location.href = "agenda.html";
}
//Função para enviar email do contato


enviarForm.addEventListener('click', (e) => {
    e.preventDefault();
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const mensagem = document.getElementById('mensagem').value.trim();

    if (nome === '' || email === '' || mensagem === '') {
        mensagemErro.style.display = 'block';
        mensagemErro.textContent = 'Por favor, preencha todos os campos!';
        return;
    }

    if (!validarEmail(email)) {
        mensagemErro.style.display = 'block';
        mensagemErro.textContent = 'Por favor, insira um endereço de e-mail válido!';
        return;
    }

    const formData = new FormData(form);
    fetch('https://formspree.io/f/mrbeaaby', {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            form.reset();
            mensagemSucesso.style.display = 'block';
            mensagemErro.style.display = 'none';
            setTimeout(() => {
                mensagemSucesso.style.display = 'none';
            }, 3000);
        })
        .catch(error => console.error(error));
});

function validarEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
}
//Redirecionamento do Botão de Agendamento
document.getElementById("botao-agendar").addEventListener("click", (event) => {
    event.preventDefault(); // Impede o envio do formulário padrão

    const nome = document.getElementById("name").value;
    const horario = document.getElementById("horarios").value;
    const dia = document.getElementById("diaDaSemana").value;
    const barbeiro = document.getElementById("barbeiros").value;
    const servico = document.getElementById("servico").value;

    // Monta a URL com os parâmetros
    const params = new URLSearchParams({
        nome,
        horario,
        dia,
        barbeiro,
        servico
    });

    // Redireciona para a página agendado.html com os parâmetros na URL
    window.location.href = `agendado.html?${params.toString()}`;
});