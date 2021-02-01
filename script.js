const image = document.querySelector("img");
const title = document.querySelector("#title");
const artist = document.querySelector("#artist");
const music = document.querySelector("audio");
const progressContainer = document.querySelector("#progress-container");
const progress = document.querySelector("#progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const prevBtn = document.querySelector("#prev");
const playBtn = document.querySelector("#play");
const nextBtn = document.querySelector("#next");

//Music array
const songs = [
  {
    name: "jacinto-1",
    displayName: "Electric Chill Machine",
    artist: "Jacinto Design",
  },

  {
    name: "jacinto-2",
    displayName: "Seven Nation Army",
    artist: "Jacinto Design",
  },

  {
    name: "jacinto-3",
    displayName: "Electric Chill Machine",
    artist: "Jacinto Design",
  },

  {
    name: "metric-1",
    displayName: "Front Row",
    artist: "Jacinto Design",
  },
];

//Is Playing
let isPlaying = false;

//Play
function playSong() {
  music.play();
  isPlaying = true;
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("title", "pause");
}

//Pause
function pauseSong() {
  music.pause();
  isPlaying = false;
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "play");
}

playBtn.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()));

//Update DOM

function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  image.src = `img/${song.name}.jpg`;
}

let songIndex = 0;

//Previous Song
function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}

//Next Song
function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);
  playSong();
}

//On-Load First Song
loadSong(songs[3]);

//Update Progress Bar and Time

function updateProgressBar(e) {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;

    //Update Progress Bar Width
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    //Calculate Display for duration
    const durationMinutes = Math.floor(duration / 60);
    console.log(durationMinutes);

    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }

    //Delay switching duration Element to avoid Nan
    if (durationSeconds) {
      durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    }

    //Calculate Display for currentTime
    const currentMinutes = Math.floor(currentTime / 60);

    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
    }
    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
  }
}

//Set ProgressBar

function setProgressBar(e) {
  const width = this.clientWidth;

  const clickX = e.offsetX;

  const { duration } = music;
  music.currentTime = (clickX / width) * duration;
}

//Event
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
music.addEventListener("timeupdate", updateProgressBar);
music.addEventListener("ended", nextSong);
progressContainer.addEventListener("click", setProgressBar);
