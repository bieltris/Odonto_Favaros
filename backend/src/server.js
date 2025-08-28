import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url'; 

// Importação das rotas.


const app = express();
const PORT = 8000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(cors());
app.use(express.json());

// Ativação das rotas.

// app.use(express.static(path.join(__dirname, '../../frontend')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/login.html'));
})


app.listen(PORT, () => {
    console.log(`Servidor da API de comentários rodando em http://localhost:${PORT}`);
});