function exibirItemNoMenu(item) {
  const menuDiv = document.getElementById("menu");
  const itemHTML = `
    <div id="itemmenu">
      <h3>${item.nome}</h3>
      <p>${item.ingredientes}</p>
    </div>
  `;
  menuDiv.insertAdjacentHTML("beforeend", itemHTML);
}

async function carregarLanches() {
    try {
            const resposta = await fetch("/data/lanches.json");
            if (!resposta.ok) throw new Error("Erro ao carregar JSON");
            menuItems = await resposta.json();

            menuItems.forEach(exibirItemNoMenu);
        } catch (erro) {
            console.error("Erro ao carregar lanches.json:", erro);
        }
}

/*async function criarLanche(novoLanche) {
    try {
        const resposta = await fetch("/api/lanches", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(novoLanche)
        });

        if (!resposta.ok) throw new Error("Erro ao criar lanche");

        const lancheCriado = await resposta.json();
        exibirItemNoMenu(lancheCriado);
    } catch (erro) {
        console.error("Erro ao criar lanche:", erro);
    }
}*/

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formulario");

    carregarLanches();

    form.addEventListener("submit", function (event) {
        event.preventDefault(); 

        const nome = document.getElementById("nome").value.trim();
        const ingredientes = document.getElementById("ingredientes").value.trim();

        if (!nome || !ingredientes) {
            alert("Preencha todos os campos!");
            return;
        }

        const query = new URLSearchParams({ nome, ingredientes }).toString();
        window.location.href = `/sugestao?${query}`;
    });
});
