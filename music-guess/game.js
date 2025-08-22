let player;
let currentTry = 0;
const durations = [1, 3, 5, 7, 10, 15];

// 🎵 Song Pool
const songs = [
  {
    name: "Smells Like Teen Spirit",
    artist: "Nirvana",
    youtubeId: "hTWKbfoikeg"
  },
  {
    name: "Africa",
    artist: "Toto",
    youtubeId: "FTQbiNvZqaY"
  },
  {
    name: "Take On Me",
    artist: "A-ha",
    youtubeId: "djV11Xbc914"
  }
];

// 🎲 Pick a random song
const target = songs[Math.floor(Math.random() * songs.length)];

function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '0',
    width: '0',
    videoId: target.youtubeId,
    events: {
      'onReady': (event) => {
        console.log("YouTube Player ready");
      },
      'onStateChange': onPlayerStateChange
    },
    playerVars: {
      autoplay: 0,
      controls: 0,
      disablekb: 1,
      modestbranding: 1,
      rel: 0
    }
  });
}


function onPlayerReady(event) {
  console.log("YouTube Player ready. Target song:", target.name);
}

function onPlayerStateChange(event) {
  if (event.data === YT.PlayerState.PLAYING) {
    setTimeout(() => {
      player.pauseVideo();
    }, durations[currentTry] * 1000);
  }
}

function playSnippet() {
  if (!player || typeof player.seekTo !== "function") {
    console.error("Player not ready yet.");
    return;
  }

  if (currentTry >= durations.length) {
    document.getElementById("message").textContent = "❌ No more tries left!";
    return;
  }

  player.pauseVideo(); // Ensure it’s not already playing
  player.seekTo(0, true); // Seek to the beginning (0s)
  player.playVideo(); // This must be triggered by a user click
}

function submitGuess() {
  const userSong = document.getElementById("songInput").value.trim().toLowerCase();
  const userArtist = document.getElementById("artistInput").value.trim().toLowerCase();
  const actualSong = target.name.toLowerCase();
  const actualArtist = target.artist.toLowerCase();

  if (userSong === actualSong && userArtist === actualArtist) {
    document.getElementById("message").textContent = `✅ Correct! 🎉 It was "${target.name}" by ${target.artist}`;
    player.stopVideo();
  } else {
    currentTry++;
    if (currentTry >= durations.length) {
      document.getElementById("message").textContent =
        `❌ Game Over! It was "${target.name}" by ${target.artist}`;
      player.stopVideo();
    } else {
      document.getElementById("message").textContent =
        `❌ Incorrect. You have ${durations.length - currentTry} tries left.`;
    }
  }
}
