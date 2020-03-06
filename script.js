const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');

// Song titles
const songs = ['hey', 'summer', 'ukulele'];

// Keep track of song
let songIndex = 2;

// Initially load song details into DOM
loadSong(songs[songIndex]);

// Update song details
function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
}

// Play song
function playSong() {
  musicContainer.classList.add('play');
  playBtn.querySelector('i').classList.remove('fa-play');
  playBtn.querySelector('i').classList.add('fa-pause');

  audio.play();
}

// Pause song
function pauseSong() {
  musicContainer.classList.remove('play');
  playBtn.querySelector('i').classList.remove('fa-pause');
  playBtn.querySelector('i').classList.add('fa-play');

  audio.pause();
}

// Previous song
function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);

  const isPlaying = musicContainer.classList.contains('play');
  if (isPlaying) {
    playSong();
  }
}

// Next song
function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);

  const isPlaying = musicContainer.classList.contains('play');
  if (isPlaying) {
    playSong();
  }
}

// Update progress bar
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;

  const progressPercent = ((currentTime / duration) * 100).toFixed(2);

  progress.style.width = `${progressPercent}%`;
}

// Set progress bar
function setProgress(e) {
  const offsetWidth = progressContainer.offsetWidth;
  const offsetX = e.offsetX;
  const { duration } = audio;
  const currentTime = (offsetX / offsetWidth) * duration;
  audio.currentTime = currentTime;
}

// Event listeners
playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play');
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// // Change song
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// Progress update
audio.addEventListener('timeupdate', updateProgress);

// Click on progress bar
progressContainer.addEventListener('click', setProgress);

// Song ends
audio.addEventListener('ended', nextSong);
