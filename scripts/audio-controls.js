class AudioControls {
  constructor() {
    this.sound = null;
    this.isPlaying = false;

    this.createButtons();
    this.createSliders();
  }

  loadAudioByUrl(url) {
    this.sound = loadSound(
      url,
      () => {
        console.log("Audio loaded successfully:", url);
      },
      () => {
        console.error("Error loading audio:", url);
      }
    );
  }

  createButtons() {
    const audioButtonBar = document.createElement("div");
    audioButtonBar.className = "button-container";

    const buttons = [
      {
        class: "button",
        id: "playButton",
        text: "Play",
        function: this.playSong.bind(this),
      },
      {
        class: "button",
        id: "pauseButton",
        text: "Pause",
        function: this.pauseSong.bind(this),
      },
      {
        class: "button",
        id: "stopButton",
        text: "Stop",
        function: this.stopSong.bind(this),
      },
      {
        class: "button",
        id: "loopButton",
        text: "Loop",
        function: this.loopSong.bind(this),
      },
    ];

    buttons.forEach((item) => {
      const button = document.createElement("button");
      button.className = item.class;
      button.id = item.id;
      button.textContent = item.text;
      button.addEventListener("click", item.function);
      audioButtonBar.appendChild(button);
    });

    document.body.appendChild(audioButtonBar);
  }

  createSliders() {
    const audioSliderBar = document.createElement("div");
    audioSliderBar.className = "slider-container";

    const sliders = [
      {
        class: "slider",
        id: "volumeSlider",
        text: "Volume",
        function: (v) => this.volume(v),
      },
    ];

    sliders.forEach((item) => {
      const label = document.createElement("label");
      label.style = "text-align:center";
      label.innerText = item.text;

      const slider = document.createElement("input");
      slider.id = item.id;
      slider.className = item.class;
      slider.type = "range";
      slider.name = item.text;
      slider.min = 0;
      slider.max = 1;
      slider.step = 0.01;
      slider.value = 0.5;
      slider.addEventListener("input", (e) => {
        item.function(e.target.value);
      });

      audioSliderBar.appendChild(label);
      audioSliderBar.appendChild(slider);
    });

    document.body.appendChild(audioSliderBar);
  }

  playSong() {
    console.log("Play button clicked");
    if (this.sound) {
      this.sound.play();
      this.isPlaying = true;
    } else {
      console.log("No audio loaded");
    }
  }

  stopSong() {
    console.log("Stop button clicked");
    if (this.sound) {
      this.sound.stop();
      this.isPlaying = false;
    }
  }

  pauseSong() {
    console.log("Pause button clicked");
    if (this.sound) {
      this.sound.pause();
      this.isPlaying = false;
    }
  }

  loopSong() {
    console.log("Loop button clicked");
    if (this.sound) {
      this.sound.loop();
    }
  }

  volume(v) {
    console.log(this.sound);

    if (this.sound) {
      this.sound.setVolume(parseFloat(v));
      console.log(v);
    }
  }
}
