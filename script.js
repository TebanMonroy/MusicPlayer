const image = document.getElementById("cover"),
  title = document.getElementById("music-title"),
  artist = document.getElementById("music-artist"),
  currentTimeE1 = document.getElementById("current-time"),
  durationE1 = document.getElementById("duration"),
  progress = document.getElementById("progress"),
  playerProgress = document.getElementById("player-progress"),
  prevBtn = document.getElementById("prev"),
  nextBtn = document.getElementById("next"),
  playBtn = document.getElementById("play"),
  background = document.getElementById("bg-img");

const music = new Audio();

const songs = [
  {
    path: "./Music/1AlcolirykoZ - Todo Lo Bueno Tarda (Prod El Arkeólogo).mp3",
    displayName: "Todo Lo Bueno Tarda",
    cover: "./Img/1todoLoBuenoTarda.jpg",
    artist: "Alcolirykoz",
  },
  {
    path: "./Music/2Café Tacuba - Eres.mp3",
    displayName: "Eres",
    cover: "./Img/2cafeTacuba.jpg",
    artist: "Café Tacvba",
  },
  {
    path: "./Music/3Crack Family - Hoy Por Hoy.mp3",
    displayName: "Hoy Por Hoy",
    cover: "./Img/3crackFamily.png",
    artist: "Crack Family",
  },
  {
    path: "./Music/4Don Omar - Taboo.mp3",
    displayName: "Taboo",
    cover: "./Img/4Taboo.jpg",
    artist: "Don Omar",
  },
  {
    path: "./Music/5Dont You Worry Child Radio Edit.mp3",
    displayName: "Don't You Worry Child",
    cover: "./Img/5DontYouWorryChild.png",
    artist: "Swedish House Mafia",
  },
  {
    path: "./Music/6Guru Josh Project - Infinity (Klaas Vocal Mix).mp3",
    displayName: "Infinity (Klaas Vocal Mix)",
    cover: "./Img/6Infinity.jpg",
    artist: "Guru Josh Proyect",
  },
  {
    path: "./Music/7Harry Styles - As It Was.mp3",
    displayName: "As It Was",
    cover: "./Img/7asItWas.jpg",
    artist: "Harry Styles",
  },
  {
    path: "./Music/8Quizás - Afaz Natural.mp3",
    displayName: "Quizás",
    cover: "./Img/8Quizas.jpg",
    artist: "Afaz Natural",
  },
  {
    path: "./Music/9Stromae - Alors On Danse.mp3",
    displayName: "Alors On Danse",
    cover: "./Img/9AlorsOnDanse.jpg",
    artist: "Stromae",
  },
  {
    path: "./Music/10Young Miko - Lisa.mp3",
    displayName: "Lisa",
    cover: "./Img/10lisa.webp",
    artist: "Young Miko",
  },
];

let musicIndex = 0;
let isPlaying = false;

function togglePlay() {
  if (isPlaying) {
    pauseMusic();
  } else {
    playMusic();
  }
}

function playMusic() {
  isPlaying = true;
  //Change play button icon
  playBtn.classList.replace("fa-play", "fa-pause");
  //Set button hover title
  playBtn.setAttribute("title", "Pause");
  music.play();
}

function pauseMusic() {
  isPlaying = false;
  //Change pause button icon
  playBtn.classList.replace("fa-pause", "fa-play");
  //Set button hover title
  playBtn.setAttribute("title", "Play");
  music.pause();
}

function loadMusic(song) {
  music.src = song.path;
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  image.src = song.cover;
  background.src = song.cover;
}

function changeMusic(direction) {
  musicIndex = (musicIndex + direction + songs.length) % songs.length;
  loadMusic(songs[musicIndex]);
  playMusic();
}

function updateProgressBar() {
  const { duration, currentTime } = music;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}`;

  const formatTime = (time) => String(Math.floor(time)).padStart(2, "0");
  durationE1.textContent = `${formatTime(duration / 60)}:${formatTime(
    duration % 60
  )}`;
  currentTimeE1.textContent = `${formatTime(currentTime / 60)}:${formatTime(
    currentTime % 60
  )}`;
}

function setProgressBar(e) {
  const width = playerProgress.clientWidth;
  const clickX = e.offsetX;
  music.currentTime = (clickX / width) * music.duration;
}

playBtn.addEventListener("click", togglePlay);
prevBtn.addEventListener("click", () => changeMusic(-1));
nextBtn.addEventListener("click", () => changeMusic(1));
music.addEventListener("ended", () => changeMusic(1));
music.addEventListener("timeupdate", updateProgressBar);
playerProgress.addEventListener("click", setProgressBar);

loadMusic(songs[musicIndex]);
