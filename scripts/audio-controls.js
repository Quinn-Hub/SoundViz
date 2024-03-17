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
      // upload download by lukas
      {
        class: "button",
        id: "uploadButton",
        text: "Upload",
        function: this.uploadSong.bind(this),
      },
      {
        class: "button",
        id: "downloadButton",
        text: "Download",
        function: this.screenCapture.bind(this),
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

    //document.body.appendChild(audioButtonBar);
    const canvasContainer = document.getElementById("canvas-container");
    canvasContainer.insertAdjacentElement("afterbegin", audioButtonBar);
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
      {
        class: "slider",
        id: "panSlider",
        text: "Pan",
        function: (v) => this.pan(v),
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
    if (this.sound && !this.sound.isPlaying()) {
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

  uploadSong() {
    console.log("Upload button clicked");
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "audio/*"; // Accept only audio files
    fileInput.click();

    fileInput.onchange = () => {
      const files = fileInput.files;
      if (files.length === 0) {
        console.log("No file selected!");
        return;
      }

      const file = files[0];

      // Check if the audio is currently playing
      if (!this.sound.paused) {
        this.sound.pause(); // Stop the currently playing audio
        this.isPlaying = false;
      }

      // Load the new sound file into p5.js
      this.sound.stop(); // Stop the current sound if it's playing
      this.sound = loadSound(URL.createObjectURL(file));
      this.isPlaying = false; // Reset the play state

      // Assign the new audio source
      this.sound.src = URL.createObjectURL(file);
      console.log("File uploaded:", file.name);
    };
  }

  screenCapture() {
    console.log("Download button clicked");
    html2canvas(document.documentElement)
      .then((canvas) => {
        const image = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.download = "screenshot.png";
        link.href = image;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((err) => console.error("Error taking screenshot:", err));
  }

  volume(v) {
    console.log(this.sound);

    if (this.sound) {
      this.sound.setVolume(parseFloat(v));
      console.log(v);
    }
  }

  pan(v) {
    if (this.sound) {
      // Adjust pan based on the slider value
      // Example:
      let value = map(v, 0.0, 1.0, -1.0, 1.0);
      this.sound.pan(value);
    }
  }
}
