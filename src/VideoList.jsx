<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Filmes Mania</title>
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <style>
        body {
            font-family: sans-serif;
            background-color: #1a202c;
            color: white;
            padding: 20px;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
        }
        h1 {
            text-align: center;
            font-size: 2.5rem;
            margin-bottom: 30px;
        }
        .video-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 20px;
        }
        .video-card {
            cursor: pointer;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            transition: transform 0.2s;
        }
        .video-card:hover {
            transform: scale(1.05);
        }
        .video-card img {
            width: 100%;
            height: auto;
            border-radius: 8px;
        }
        .video-card p {
            margin-top: 8px;
            text-align: center;
            font-size: 1rem;
            font-weight: bold;
        }
        .video-player {
            margin-top: 30px;
            text-align: center;
        }
        .video-player button {
            background-color: #e53e3e;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            margin-bottom: 10px;
            font-size: 1rem;
            font-weight: bold;
        }
        .video-player iframe {
            max-width: 100%;
            border-radius: 8px;
        }
        .loading-message, .error-message {
            text-align: center;
            font-size: 1.2rem;
            margin-top: 50px;
        }
    </style>
</head>
<body>

<div id="root" class="container"></div>

<script type="text/babel">
    const { useState, useEffect } = React;

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
        {
            title: "Cena de Ação Incrível",
            thumbnail: "https://i.ytimg.com/vi/W_aV_vV8f8M/hqdefault.jpg",
            url: "https://www.youtube.com/watch?v=W_aV_vV8f8M",
        },
        {
            title: "Diálogo Emocionante de Filme",
            thumbnail: "https://i.ytimg.com/vi/aZ3U_L2jK5o/hqdefault.jpg",
            url: "https://www.youtube.com/watch?v=aZ3U_L2jK5o",
        }
    ];

    function App() {
        const [videos, setVideos] = useState([]);
        const [playing, setPlaying] = useState(null);
        const [loading, setLoading] = useState(true);

        useEffect(() => {
            // Simula uma chamada de API
            setTimeout(() => {
                setVideos(mockVideos);
                setLoading(false);
            }, 1500);
        }, []);

        return (
            <div>
                <h1>Cenas de Filmes</h1>
                {loading ? (
                    <div className="loading-message">Carregando vídeos...</div>
                ) : (
                    <div className="video-grid">
                        {videos.map(v => (
                            <div key={v.url} onClick={() => setPlaying(v.url)} className="video-card">
                                <img
                                    src={v.thumbnail || 'https://via.placeholder.com/320x180?text=Sem+Thumbnail'}
                                    alt={v.title}
                                />
                                <p>{v.title}</p>
                            </div>
                        ))}
                    </div>
                )}

                {playing && (
                    <div className="video-player">
                        <button onClick={() => setPlaying(null)}>Fechar vídeo</button>
                        <iframe
                            width="560"
                            height="315"
                            src={`https://www.youtube.com/embed/${new URLSearchParams(new URL(playing).search).get('v')}`}
                            frameBorder="0"
                            allow="autoplay; encrypted-media"
                            allowFullScreen
                            title="Video player"
                        />
                    </div>
                )}
            </div>
        );
    }

    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(<App />);
</script>

</body>
</html>
