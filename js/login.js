// Simulação de banco de dados de usuários
const usuarios = [
    { email: "usuario1@email.com", senha: "123456" },
    { email: "usuario2@email.com", senha: "abcdef" }
];

// Salvando usuários no localStorage (apenas na primeira vez)
if (!localStorage.getItem("usuarios")) {
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

// Função de login
function login(event) {
    event.preventDefault();
    
    const email = document.getElementById("email").value;
    const senha = document.getElementById("password").value; // Corrigido o ID do campo senha
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    
    const usuarioEncontrado = usuarios.find(user => user.email === email && user.senha === senha);
    
    if (usuarioEncontrado) {
        localStorage.setItem("usuarioLogado", JSON.stringify(usuarioEncontrado));
        window.location.href = "Baber/Pages/index.html"; // Redireciona para a página home dentro da pasta Pages
    } else {
        document.getElementById("login-error").textContent = "E-mail ou senha incorretos!";
    }
}

// Adicionar evento ao formulário
document.getElementById("login-form").addEventListener("submit", login);
