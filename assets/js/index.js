import AudioClass from "./Audio.js";

export default class MusicPlayer {
  songsList = [
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
  constructor() {
    this.$ = document.querySelector.bind(document);
    this.currentSong = this.songsList[0];
    this.audio = new AudioClass(this.currentSong);

    this.render();
  }

  play() {
    const playBtn = this.$("#play-btn");
    playBtn.addEventListener("click", () => {
      this.audio.play();
    });
  }

  progressClick() {
    this.audio.progressClick();
  }

  renderTitle({ name, singer } = this.currentSong) {
    this.$(".music-header .info .song-name").innerText = name;
    this.$(".music-header .info .singer-name").innerText = singer || "VA";
  }

  renderSongsList() {
    const songsList = this.songsList.map((song, index) => {
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
    this.$(".songs-list").innerHTML = songsList.join("");
  }

  render() {
    const songPlaying = localStorage.getItem("songPlaying") || this.currentSong;
    this.audio.src = songPlaying.path;

    this.renderTitle();
    this.renderSongsList();
    this.play();
    this.progressClick();
  }
}

new MusicPlayer();
