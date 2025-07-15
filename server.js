const express = require('express')
const app = express();
const PORT = 3000;
const path = require('path');
const fs = require('fs');
const jsonPath = path.join(__dirname, 'public', 'data', 'lanches.json');
const contatosPath = path.join(__dirname, 'public', 'data', 'contato.json');

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/contato', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'contato.html'));
});

app.get('/api/lanches', (req, res) => {
    res.sendFile(jsonPath);
});

app.get('/api/contato', (req, res) => {
    res.sendFile(contatosPath);
});

app.get('/sugestao', (req, res) => {
    const { nome, ingredientes } = req.query;

    fs.readFile(jsonPath, 'utf8', (err, data) => {
        if (err) return res.status(500).send('Erro ao ler o arquivo JSON.');

        let lanches = [];
        try {
            lanches = JSON.parse(data);
        } catch (e) {
            return res.status(500).send('Erro ao interpretar o JSON.');
        }

        const novoId = lanches.length > 0 ? lanches[lanches.length - 1].id + 1 : 1;

        const novoLanche = {
            id: novoId,
            nome,
            ingredientes
        };

        lanches.push(novoLanche);

        fs.writeFile(jsonPath, JSON.stringify(lanches, null, 2), 'utf8', (err) => {
        if (err) return res.status(500).send('Erro ao salvar o JSON.');
        
        res.sendFile(path.join(__dirname, 'views', 'agradecimento.html'));
        });
    });
});

app.post("/contato", (req, res) => {
    const { nome, email, assunto, mensagem } = req.body;

    fs.readFile(contatosPath, "utf8", (err, data) => {
        let contatos = [];

        if (!err) {
            try {
                contatos = JSON.parse(data);
            } catch (e) {
                return res.status(500).send("Erro ao interpretar o JSON.");
            }
        }

        const novoId = contatos.length > 0 ? contatos[contatos.length - 1].id + 1 : 1;

        const novoContato = {
            id: novoId,
            nome,
            email,
            assunto,
            mensagem,
        };

        contatos.push(novoContato);

        fs.writeFile(contatosPath, JSON.stringify(contatos, null, 2), "utf8", (err) => {
            if (err) return res.status(500).send("Erro ao salvar o JSON.");

            res.send(`
                <header class="header">
                    <a class="logo" href="/">
                        <img src="/images/logo.png" alt="DevBurger Logo">
                        <p class="title" href="/">DevBurger</p>
                    </a>

                    <div class="cabecalho">
                        <a class="contato" href="/contato">Contato</a>
                        <a class="api" href="/api/lanches">API L.</a>
                        <a class="api" href="/api/contato">API C.</a>
                    </div>
                </header>
                <h1>Contato Recebido!</h1>
                <p><strong>Nome:</strong> ${nome}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Assunto:</strong> ${assunto}</p>
                <p><strong>Mensagem:</strong> ${mensagem}</p>
            `);
        });
    });
});

app.listen(PORT, () => {
    console.log(`Servidor da DevBurger rodando em localhost:${PORT}`);
});