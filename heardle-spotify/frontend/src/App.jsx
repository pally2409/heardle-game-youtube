import React, { useState, useRef, useEffect } from "react";

export default function App() {
  const [url, setUrl] = useState("");
  const [songs, setSongs] = useState([]);
  const [current, setCurrent] = useState(null);
  const [guess, setGuess] = useState("");
  const [revealed, setRevealed] = useState(false);
  const playerRef = useRef(null);

  const loadPlaylist = async () => {
    const res = await fetch("http://localhost:5000/api/playlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });
    const data = await res.json();
    setSongs(data);
    if (data.length > 0) {
      const song = data[Math.floor(Math.random() * data.length)];
      setCurrent(song);
    }
  };

  useEffect(() => {
    if (current) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
      window.onYouTubeIframeAPIReady = () => {
        playerRef.current = new window.YT.Player("player", {
          height: "0", width: "0", videoId: current.youtubeId,
          events: { onReady: (e) => { e.target.playVideo(); setTimeout(() => e.target.pauseVideo(), 5000); } },
        });
      };
    }
  }, [current]);

  const check = () => {
    if (guess.toLowerCase().includes(current.title.toLowerCase())) {
      setRevealed(true);
      alert("✅ Spot on!");
    } else {
      alert("❌ Not quite, try again!");
    }
  };

  return (
    <div style={{ padding: '2rem', background: '#111', color: '#eee', minHeight: '100vh' }}>
      <h1>🎵 Heardle Spotify</h1>

      {!current ? (
        <>
          <input
            style={{ padding:'8px', width:'80%' }}
            placeholder="Spotify playlist URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button onClick={loadPlaylist} style={{ marginLeft:'8px' }}>Load</button>
        </>
      ) : (
        <>
          <div id="player" />
          <input
            placeholder="Guess the track..."
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            style={{ padding:'8px', width:'60%' }}
          />
          <button style={{ marginLeft:'8px' }} onClick={check}>Submit</button>
          {revealed && <p>✅ It’s: <strong>{current.title}</strong></p>}
        </>
      )}
    </div>
  );
}