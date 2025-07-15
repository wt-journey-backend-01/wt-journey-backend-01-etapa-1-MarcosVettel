async function chamarPost(payload) {
    try {
        const resposta = await fetch("/contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        });

        if (resposta.ok) {
            const html = await resposta.text();
            document.body.innerHTML = html;
        } else {
            alert("Erro ao enviar o contato.");
        }
    } catch (erro) {
        console.error("Erro na requisição:", erro);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formulario");

    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        const nome = document.getElementById("nome").value.trim();
        const email = document.getElementById("email").value.trim();
        const assunto = document.getElementById("assunto").value.trim();
        const mensagem = document.getElementById("mensagem").value.trim();

        if (!nome || !email || !assunto || !mensagem) {
            return alert("Preencha todos os campos!");
        }

        const payload = {
            nome,
            email,
            assunto,
            mensagem,
        };

        chamarPost(payload);
    });
});
