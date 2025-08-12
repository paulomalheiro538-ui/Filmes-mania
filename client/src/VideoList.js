import React, { useState, useEffect } from 'react';

export default function VideoList() {
  const [videos, setVideos] = useState([]);
  const [playing, setPlaying] = useState(null);

  useEffect(() => {
    fetch('/api/videos')
      .then(res => res.json())
      .then(setVideos)
      .catch(console.error);
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Cenas de Filmes</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
        {videos.map(v => (
          <div key={v.url} onClick={() => setPlaying(v.url)} style={{ cursor: 'pointer', width: 200 }}>
            <img
              src={v.thumbnail || 'https://via.placeholder.com/320x180?text=Sem+Thumbnail'}
              alt={v.title}
              style={{ width: '100%', borderRadius: 8 }}
            />
            <p style={{ marginTop: 8 }}>{v.title}</p>
          </div>
        ))}
      </div>

      {playing && (
        <div style={{ marginTop: 30 }}>
          <button onClick={() => setPlaying(null)} style={{ marginBottom: 10 }}>Fechar vídeo</button>
          {playing.includes('youtube.com') && (
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${new URLSearchParams(new URL(playing).search).get('v')}`}
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title="Video player"
            />
          )}
          {!playing.includes('youtube.com') && (
            <a href={playing} target="_blank" rel="noopener noreferrer">Abrir vídeo externo</a>
          )}
        </div>
      )}
    </div>
  );
}
