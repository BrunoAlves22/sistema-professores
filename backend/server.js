const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const professorRoutes = require('./routes/professorRoutes');

app.use('/professores', professorRoutes);

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});