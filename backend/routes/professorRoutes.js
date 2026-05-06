const express = require('express');
const router = express.Router();
const db = require('../db');

// Listar professores
router.get('/', (req, res) => {
    db.query('SELECT * FROM professor', (err, results) => {
        if (err) {
            return res.status(500).json({ erro: err });
        }

        res.json(results);
    });
});

// Cadastrar professor
router.post('/', (req, res) => {
    const { nome, email, especialidade } = req.body;

    db.query(
        'INSERT INTO professor (nome, email, especialidade) VALUES (?, ?, ?)',
        [nome, email, especialidade],
        (err, result) => {
            if (err) {
                return res.status(500).json({ erro: err });
            }

            res.json({
                mensagem: 'Professor cadastrado com sucesso!',
                id: result.insertId
            });
        }
    );
});

module.exports = router;