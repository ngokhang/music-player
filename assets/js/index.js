const songsList = [
  {
    name: "Hit me up",
    singer: "Binz",
    path: "./assets/music/hitmeup.mp3",
  },
  {
    name: "Nevada",
    singer: "Vicetone",
    path: "./assets/music/nevada.mp3",
  },
  {
    name: "Simp gái 808",
    singer: "Low G",
    path: "./assets/music/simp808.mp3",
  },
];

export default class MusicPlayer {
  constructor() {
    this.$ = document.querySelector.bind(document);
    this.currentSong = songsList[0];
    this.audio = this.$("#audio");
    this.audio.src = this.currentSong.path;
    this.playBtn = this.$("#play-btn");
    this.progress = this.$("#progress");
    this.playBtn = this.$("#play-btn");
    this.replayBtn = this.$("#replay-btn");
    this.nextBtn = this.$("#next-btn");
    this.prevBtn = this.$("#prev-btn");
    this.isLoop = false;
    this.isPlaying = false;
    this.currentSongIndex =
      songsList.findIndex((song) => song.name === this.currentSong.name) > 0
        ? songsList.findIndex((song) => song.name === this.currentSong.name)
        : 0;

    this.render();
    this.play();
    this.progressClick();
    this.nextClick();
    this.prevClick();
    this.loopClick();
  }

  togglePlayPause() {
    if (this.isPlaying) {
      this.playBtn.classList.add("playing");
      return;
    }
    this.playBtn.classList.remove("playing");
  }

  play() {
    this.playBtn.addEventListener("click", () => {
      if (this.audio.paused) {
        this.isPlaying = true;
        this.audio.src = this.currentSong.path;
        this.audio.play();
        this.audio.addEventListener("timeupdate", () => {
          if (this.audio.currentTime === this.audio.duration) {
            this.togglePlayPause();
            progress.value = 0;
            if (this.isLoop) {
              this.audio.play();
              this.togglePlayPause();
              return;
            }
          }
          progress.value =
            (this.audio.currentTime / this.audio.duration) * 100 || 0;
        });
      } else {
        this.isPlaying = false;
        this.audio.pause();
      }

      this.togglePlayPause();
    });
  }

  progressClick() {
    this.progress.addEventListener("click", (e) => {
      this.isPlaying = true;
      const { offsetX } = e;
      const progressWidth = progress.offsetWidth;
      const duration = this.audio.duration;
      this.audio.currentTime = (offsetX / progressWidth) * duration;
    });
  }

  loopClick() {
    this.replayBtn.addEventListener("click", (e) => {
      this.isLoop = !this.isLoop;
      if (this.isLoop) {
        this.replayBtn.classList.add("active");
        return;
      }
      this.replayBtn.classList.remove("active");
    });
  }

  nextClick() {
    this.nextBtn.addEventListener("click", (e) => {
      this.isPlaying = false;
      this.togglePlayPause();
      this.currentSongIndex =
        this.currentSongIndex + 1 === songsList.length
          ? 0
          : this.currentSongIndex + 1;
      this.currentSong = songsList[this.currentSongIndex] || songsList[0];
      this.audio.src = this.currentSong.path;
      this.render();
    });
  }

  prevClick() {
    this.prevBtn.addEventListener("click", (e) => {
      this.isPlaying = false;
      this.togglePlayPause();
      this.currentSongIndex =
        this.currentSongIndex - 1 < 0
          ? songsList.length - 1
          : this.currentSongIndex - 1;
      this.currentSong = songsList[this.currentSongIndex] || songsList[0];
      this.audio.src = this.currentSong.path;
      this.render();
    });
  }

  render() {
    const songListElement = songsList.map((song, index) => {
      return `
      <li class="song">
        <div>
          <img src="./assets/img/nhan-vat-doraemon-3012_329.png" alt="" />
          <div class="song-info">
            <p class="song-name">${song.name}</p>
            <p class="singer-name">${song.singer}</p>
          </div>
        </div>
        <div class="option">
          <span class="material-symbols-outlined"> more_horiz </span>
        </div>
      </li>
      `;
    });
    this.$(".music-header .info .song-name").innerText =
      this.currentSong.name || "Unknown";
    this.$(".music-header .info .singer-name").innerText =
      this.currentSong.singer || "VA";

    this.$(".songs-list").innerHTML = songListElement.join("");
  }
}

new MusicPlayer();
