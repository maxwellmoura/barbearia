// Simulação de banco de dados de usuários
const usuarios = [
    { email: "usuario1@email.com", senha: "123456" },
    { email: "usuario2@email.com", senha: "abcdef" }
];

// Salvando usuários no localStorage (apenas se não existir)
if (!localStorage.getItem("usuarios")) {
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

// Função de login
function login(event) {
    event.preventDefault();
    
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("password").value.trim();
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const loginError = document.getElementById("login-error");
    
    loginError.textContent = ""; // Limpa mensagens anteriores
    
    if (!email || !senha) {
        loginError.textContent = "Preencha todos os campos!";
        return;
    }

    const usuarioEncontrado = usuarios.find(user => user.email === email && user.senha === senha);
    
    if (usuarioEncontrado) {
        localStorage.setItem("usuarioLogado", JSON.stringify(usuarioEncontrado));
        window.location.href = "/Pages/home.html";
    } else {
        loginError.textContent = "E-mail ou senha incorretos!";
    }
}

// Adicionar evento ao formulário de login
document.getElementById("login-form").addEventListener("submit", login);
