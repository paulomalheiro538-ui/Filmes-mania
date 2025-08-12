// src/index.js

// Carrega as variáveis de ambiente do arquivo .env
require('dotenv').config();

// Importa os módulos necessários
const express = require('express');
const cors = require('cors');
const path = require('path');
const { google } = require('googleapis');

// Cria a instância do aplicativo Express
const app = express();
// Define a porta do servidor
const port = process.env.PORT || 3000;

// Obtém a chave da API do YouTube
const YOUTUBE_API_KEY = process.env.YT_API_KEY;

// Inicializa o cliente da API do YouTube
const youtube = google.youtube({
  version: 'v3',
  auth: YOUTUBE_API_KEY,
});

// Middleware para permitir requisições de diferentes origens (CORS)
app.use(cors());

// --- SERVE O FRONTEND DO REACT ---
// Define a pasta 'build' como a pasta de arquivos estáticos
app.use(express.static(path.join(__dirname, '..', 'Cliente_src', 'build')));

// Para qualquer outra rota que não seja a API, o servidor irá enviar o arquivo index.html
// Isso garante que o React Router (se você estiver usando) funcione
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'Cliente_src', 'build', 'index.html'));
});

// --- FIM DA CONFIGURAÇÃO DO FRONTEND ---

// Rota para buscar vídeos
app.get('/api/videos', async (req, res) => {
  try {
    // Termo de busca (futuramente virá do frontend)
    const searchQuery = 'cenas de filmes famosas';

    // Chama a API do YouTube
    const response = await youtube.search.list({
      part: 'snippet',
      q: searchQuery,
      type: 'video',
      maxResults: 15,
    });

    // Formata os dados para o frontend
    const videos = response.data.items.map(item => ({
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.high.url,
      url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
    }));

    res.json(videos);

  } catch (error) {
    console.error("Erro ao buscar vídeos da API do YouTube:", error);
    res.status(500).json({ error: 'Falha ao buscar vídeos' });
  }
});

// Removemos a rota `app.get('/')` de teste, pois ela não é mais necessária

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor backend rodando em http://localhost:${port}`);
  console.log('Agora acesse http://localhost:3000 para ver o frontend!');
});
