export default class AudioClass {
  constructor(song) {
    this.$ = document.querySelector.bind(document);
    this.currentSong = song;
    this.audio = this.$("#audio");
    this.audio.src = this.currentSong.path;
    this.currentTime = 0;
    this.isLoop = false;

    this.progressSliderRun();
  }

  togglePlayPause() {
    const playBtn = this.$("#play-btn");
    if (playBtn.classList.contains("playing")) {
      playBtn.classList.remove("playing");
      return;
    }
    playBtn.classList.add("playing");
  }

  play() {
    if (this.audio.paused) {
      this.audio.play();
    } else {
      this.audio.pause();
    }

    this.togglePlayPause();
  }

  progressClick() {
    const progress = this.$("#progress");
    progress.addEventListener("click", (e) => {
      const { offsetX } = e;
      const progressWidth = progress.offsetWidth;
      const duration = this.audio.duration;
      this.audio.currentTime = (offsetX / progressWidth) * duration;
    });
  }

  progressSliderRun() {
    const progress = this.$("#progress"); // progress bar
    this.audio.addEventListener("timeupdate", () => {
      if (this.audio.currentTime === this.audio.duration) {
        this.togglePlayPause();
        progress.value = 0;
      }
      progress.value =
        (this.audio.currentTime / this.audio.duration) * 100 || 0;
    });
  }

  nextClick() {}

  prevClick() {}

  loopClick() {}

  randomClick() {}
}
