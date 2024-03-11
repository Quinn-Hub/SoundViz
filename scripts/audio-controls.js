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
        function: this.volume.bind(this),
      },
    ];

    sliders.forEach((item) => {
      const label = document.createElement("label");
      label.style = "text-align:center";
      label.innerText = item.text;

      const slider = document.createElement("input");
      slider.id = item.id;
      slider.className = item.class;
      slider.addEventListener("input", item.function);
      slider.name = item.text;
      slider.type = "range";
      slider.min = 0;
      slider.max = 1;
      slider.step = 0.01;
      slider.value = 0.5;

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

  volume() {
    console.log("Volume Slider changed");
    if (this.sound) {
      this.sound.setVolume(parseFloat(this.value));
    }
  }
}
