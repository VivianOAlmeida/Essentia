const usuarioCorreto = "oliveiraalmeidavivian@email.com";
const senhaCorreta = "12345678";

document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    if (email === usuarioCorreto && senha === senhaCorreta) {
        alert("Login realizado com sucesso!");

        window.location.href = "feed.html";
    } else {
        document.getElementById("mensagem").textContent =
            "E-mail ou senha incorretos.";
    }
});