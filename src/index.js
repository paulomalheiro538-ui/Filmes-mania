const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

const mockVideos = [
  {
    title: "Cena de Ação Incrível",
    thumbnail: "https://i.ytimg.com/vi/W_aV_vV8f8M/hqdefault.jpg",
    url: "https://www.youtube.com/watch?v=W_aV_vV8f8M",
  },
  {
    title: "Diálogo Emocionante de Filme",
    thumbnail: "https://i.ytimg.com/vi/aZ3U_L2jK5o/hqdefault.jpg",
    url: "https://www.youtube.com/watch?v=aZ3U_L2jK5o",
  },
  {
    title: "Momento de Comédia Clássico",
    thumbnail: "https://i.ytimg.com/vi/R_2p-n9a9qA/hqdefault.jpg",
    url: "https://www.youtube.com/watch?v=R_2p-n9a9qA",
  },
  {
    title: "Trailer de Ficção Científica",
    thumbnail: "https://i.ytimg.com/vi/eJ3b7_1P-s0/hqdefault.jpg",
    url: "https://www.youtube.com/watch?v=eJ3b7_1P-s0",
  },
];

app.use(cors());

app.get('/api/videos', (req, res) => {
  res.json(mockVideos);
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
