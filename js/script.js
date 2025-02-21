const form = document.getElementById('form-contato');
const enviarForm = document.getElementById('enviar-form');
const mensagemSucesso = document.getElementById('mensagem-sucesso');
const mensagemErro = document.getElementById('mensagem-erro');
const menuItens = document.getElementById('menuItens');
const botaoAgendar = document.getElementById("botao-agendar");

// Código para o Menu
function clickMenu() {
    menuItens.style.display = menuItens.style.display === 'block' ? 'none' : 'block';
}

// Função para redirecionar para a página de agendamento
function redirecionar() {
    window.location.href = "agenda.html";
}

// Função para validar e enviar o formulário de contato
enviarForm.addEventListener('click', (e) => {
    e.preventDefault();
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const mensagem = document.getElementById('mensagem').value.trim();

    if (!nome || !email || !mensagem) {
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
        headers: { 'Accept': 'application/json' }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        form.reset();
        mensagemSucesso.style.display = 'block';
        mensagemErro.style.display = 'none';
        setTimeout(() => mensagemSucesso.style.display = 'none', 3000);
    })
    .catch(error => {
        console.error(error);
        mensagemErro.style.display = 'block';
        mensagemErro.textContent = 'Erro ao enviar o formulário. Tente novamente!';
    });
});

// Função para validar email
function validarEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
}

// Redirecionamento do botão de agendamento
if (botaoAgendar) {
    botaoAgendar.addEventListener("click", (event) => {
        event.preventDefault();
        const params = new URLSearchParams({
            nome: document.getElementById("name").value,
            horario: document.getElementById("horarios").value,
            dia: document.getElementById("diaDaSemana").value,
            barbeiro: document.getElementById("barbeiros").value,
            servico: document.getElementById("servico").value
        });
        window.location.href = `agendado.html?${params.toString()}`;
    });
}