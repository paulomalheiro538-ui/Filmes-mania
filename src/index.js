// src/index.js

// Carrega as variáveis de ambiente do arquivo .env
require('dotenv').config();

// Importa os módulos necessários
const express = require('express');
const cors = require('cors');
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

// Rota para a página inicial (pode ser usada para um teste simples)
app.get('/', (req, res) => {
  res.send('Servidor do Filmes-mania está online!');
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor backend rodando em http://localhost:${port}`);
  console.log('Agora inicie o frontend na outra pasta para ver os vídeos!');
});
