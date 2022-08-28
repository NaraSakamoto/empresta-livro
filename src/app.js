import express from "express";
import sqlite3 from "sqlite3";

const app = express();
app.use(express.json());

const db = new sqlite3.Database('./sql/base.db', (err) => {
    if (err) {
        console.log("Erro ao abrir base de dados " + err.message);
    } else {
        console.log("Conectado com o Banco de Dados")
    }
})

app.get('/', (req, res) => {
    res.status(200).send('API de Emprestimo de Livros');
})

app.get('/livros', (req, res) => {

    if (req.query.titulo) {
        db.all("SELECT * FROM livro WHERE titulo LIKE ?", [`%${req.query.titulo}%`],
            (err, livros) => {
                if (err) {
                    res.status(500).json({ "error": err.message });
                    return;
                }
                res.status(200).json({ livros });
            });
        return;
    }

    db.all("SELECT * FROM livro", (err, livros) => {
        if (err) {
            res.status(500).json({ "error": err.message });
            return;
        }
        res.status(200).json({ livros });
    });
})

app.get('/proprietarios', (req, res) => {

    db.all("SELECT * FROM proprietario",
        (err, proprietarios) => {
            if (err) {
                res.status(500).json({ "error": err.message });
                return;
            }
            res.status(200).json({ proprietarios });
        });
});

app.get('/emprestimos', (req, res) => {

    if (req.query.data) {
        db.all("SELECT * FROM emprestimo WHERE data_emprestimo = ?", [`${req.query.data}`],
            (err, emprestimos) => {
                if (err) {
                    res.status(500).json({ "error": err.message });
                    return;
                }
                res.status(200).json({ emprestimos });
            });
        return;
    }

    db.all("SELECT * FROM emprestimo", (err, emprestimos) => {
        if (err) {
            res.status(500).json({ "error": err.message });
            return;
        }
        res.status(200).json({ emprestimos });
    });
})

app.get('/clientes', (req, res) => {

    db.all("SELECT * FROM cliente", (err, clientes) => {
        if (err) {
            res.status(500).json({ "error": err.message });
            return;
        }
        res.status(200).json({ clientes });
    });
});

app.post('/livros', (req, res) => {
    let livro = req.body;

    if (livro.id_proprietario == null || livro.titulo == null || livro.autor == null) {
        res.status(400).json({ "error": "Está faltando dados para criar um livro, verifique e tente novamente! Dados obrigatórios: id_proprietario, titulo e autor!" });
        return;
    }

    db.run("INSERT INTO livro (id_proprietario, titulo, autor) VALUES (?,?,?)", [livro.id_proprietario, livro.titulo, livro.autor],
        function (err) {
            if (err) {
                res.status(500).json({ "error": err.message });
                return;
            }
            res.status(201).send();
        });
});

app.post('/proprietarios', (req, res) => {
    let proprietario = req.body;

    if (proprietario.nome == null || proprietario.email == null) {
        res.status(400).json({ "error": "Está faltando dados para criar um proprietario, verifique e tente novamente! Dados obrigatórios: nome e email!" });
        return;
    }

    db.run("INSERT INTO proprietario (nome, email) VALUES (?,?)", [proprietario.nome, proprietario.email],
        function (err) {
            if (err) {
                res.status(500).json({ "error": err.message });
                return;
            }
            res.status(201).send();
        });
});

app.post('/emprestimos', (req, res) => {
    let emprestimo = req.body;

    if (emprestimo.id_livro == null || emprestimo.id_cliente == null) {
        res.status(400).json({ "error": "Está faltando dados para criar um emprestimo, verifique e tente novamente! Dados obrigatórios: id_livro e id_cliente!" });
        return;
    }

    if (emprestimo.data_emprestimo == null) {
        let currentDate = new Date();
        emprestimo.data_emprestimo = currentDate.getDate() + "/" + (currentDate.getMonth() + 1) + "/" + currentDate.getFullYear();
    }

    db.run("INSERT INTO emprestimo (id_livro, id_cliente, data_emprestimo) VALUES (?,?,?)",
        [emprestimo.id_cliente, emprestimo.id_livro, emprestimo.data_emprestimo],
        function (err) {
            if (err) {
                res.status(500).json({ "error": err.message });
                return;
            }
            res.status(201).send();
        });
});

app.post('/clientes', (req, res) => {
    let cliente = req.body;

    if (cliente.nome == null) {
        res.status(400).json({ "error": "Está faltando dados para criar um cliente, verifique e tente novamente! Dados obrigatórios: nome!" });
        return;
    }

    db.run("INSERT INTO cliente (nome) VALUES (?)", cliente.nome,
        function (err) {
            if (err) {
                res.status(500).json({ "error": err.message });
                return;
            }
            res.status(201).send();
        });
});

app.put('/livros/:id', (req, res) => {
    db.get('SELECT id FROM livro WHERE id = ?', req.params.id,
        (err, row) => {
            if (err) {
                res.status(500).json({ "error": err.message });
                return;
            }
            if (row == null) {
                res.status(404).json({ "error": "Não existe livro com o id informado" });
                return;
            }

            let alteracoes = [];

            let livro = req.body;
            if(livro.titulo) alteracoes.push(`titulo = "${livro.titulo}"`);
            if(livro.autor) alteracoes.push(`autor = "${livro.autor}"`); 
            if(livro.proprietario) alteracoes.push(`proprietario =${livro.proprietario}`);

            let query = `UPDATE livro SET ${alteracoes} WHERE id = ${req.params.id}`;
            
            db.run(query,
                function (err) {
                    if (err) {
                        res.status(500).json({ "error": err.message });
                        return;
                    }
                    res.status(200).json({ "Message": "Livro atualizado com sucesso!" });
                }
            );
        }
    );
});

app.put('/proprietarios/:id', (req, res) => {
    db.get('SELECT id FROM proprietario WHERE id = ?', req.params.id,
        (err, row) => {
            if (err) {
                res.status(500).json({ "error": err.message });
                return;
            }
            if (row == null) {
                res.status(404).json({ "error": "Não existe proprietario com o id informado" });
                return;
            }


            let alteracoes = [];

            let proprietario = req.body;
            if(proprietario.nome) alteracoes.push(`nome = "${proprietario.nome}"`);
            if(proprietario.email) alteracoes.push(`email = "${proprietario.email}"`); 

            let query = `UPDATE proprietario SET ${alteracoes} WHERE id = ${req.params.id}`;

            db.run(query,
                function (err) {
                    if (err) {
                        res.status(500).json({ "error": err.message });
                        return;
                    }
                    res.status(200).send();
                }
            );
        }
    );
});


app.put('/emprestimos/:id', (req, res) => {
    db.get('SELECT id FROM emprestimo WHERE id = ?', req.params.id,
        (err, row) => {
            if (err) {
                res.status(500).json({ "error": err.message });
                return;
            }
            if (row == null) {
                res.status(404).json({ "error": "Não existe emprestimo com o id informado" });
                return;
            }

            let alteracoes = [];

            let emprestimo = req.body;
            if(emprestimo.id_cliente) alteracoes.push(`id_cliente = "${emprestimo.id_cliente}"`);
            if(emprestimo.id_livro) alteracoes.push(`id_livro = "${emprestimo.id_livro}"`); 
            if(emprestimo.data_emprestimo) alteracoes.push(`data_emprestimo =${emprestimo.data_emprestimo}`);

            let query = `UPDATE emprestimo SET ${alteracoes} WHERE id = ${req.params.id}`;

            db.run(query,
                function (err) {
                    if (err) {
                        res.status(500).json({ "error": err.message });
                        return;
                    }
                    res.status(200).send();
                }
            );
        }
    );
});


app.delete('/livros/:id', (req, res) => {

    db.get('SELECT id FROM livro WHERE id = ?', req.params.id,
        (err, row) => {
            if (err) {
                res.status(500).json({ "error": err.message });
                return;
            }
            if (row == null) {
                res.status(404).json({ "error": "Não existe livro com o id informado" });
                return;
            }

            db.run("DELETE FROM livro WHERE id = ?", req.params.id,
                (err, row) => {
                    if (err) {
                        res.status(500).json({ "error": err.message });
                        return;
                    }
                    res.status(200).send();
                }
            );
        }
    );
});


app.delete('/proprietarios/:id', (req, res) => {

    db.get('SELECT id FROM proprietario WHERE id = ?', req.params.id,
        (err, row) => {
            if (err) {
                res.status(500).json({ "error": err.message });
                return;
            }
            if (row == null) {
                res.status(404).json({ "error": "Não existe proprietario com o id informado" });
                return;
            }
            db.run("DELETE FROM proprietario WHERE id = ?", req.params.id,
                (err, row) => {
                    if (err) {
                        res.status(500).json({ "error": err.message });
                        return;
                    }
                    res.status(200).send();
                }
            );
        }
    );
});

app.delete('/emprestimos/:id', (req, res) => {

    db.get('SELECT id FROM emprestimo WHERE id = ?', req.params.id,
        (err, row) => {
            if (err) {
                res.status(500).json({ "error": err.message });
                return;
            }
            if (row == null) {
                res.status(404).json({ "error": "Não existe emprestimo com o id informado" });
                return;
            }
            db.run("DELETE FROM emprestimo WHERE id = ?", req.params.id,
                (err, row) => {
                    if (err) {
                        res.status(500).json({ "error": err.message });
                        return;
                    }
                    res.status(200).send();
                }
            );
        }
    );
});

app.delete('/clientes/:id', (req, res) => {

    db.get('SELECT id FROM cliente WHERE id = ?', req.params.id,
        (err, row) => {
            if (err) {
                res.status(500).json({ "error": err.message });
                return;
            }
            if (row == null) {
                res.status(404).json({ "error": "Não existe cliente com o id informado" });
                return;
            }
            db.run("DELETE FROM cliente WHERE id = ?", req.params.id,
                (err, row) => {
                    if (err) {
                        res.status(500).json({ "error": err.message });
                        return;
                    }
                    res.status(200).send();
                }
            );
        }
    );
});

export default app