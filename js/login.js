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
    const senha = document.getElementById("password").value;
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    
    const usuarioEncontrado = usuarios.find(user => user.email === email && user.senha === senha);
    
    if (usuarioEncontrado) {
        localStorage.setItem("usuarioLogado", JSON.stringify(usuarioEncontrado));

        // Redireciona para index.html
        window.location.href = "index.html"; 
    } else {
        const erroMsg = document.getElementById("login-error");
        erroMsg.textContent = "E-mail ou senha incorretos!";
        erroMsg.style.color = "red"; 
    }
}

// Espera o DOM carregar antes de adicionar o evento ao formulário
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("login-form").addEventListener("submit", login);
});
