const params = new URLSearchParams(window.location.search);
const nome = params.get("nome");
const ingredientes = params.get("ingredientes");

const resumo = document.getElementById("resumo");
    resumo.innerHTML = `
    <strong>Nome do lanche:</strong> ${nome}<br>
    <strong>Ingredientes:</strong> ${ingredientes}
`;