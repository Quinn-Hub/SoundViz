// Reuben Chavez
// Purpose to Add Functionality to Buttons 

class AudioControls {
  constructor(sound) {
    this.audio = sound; // Assign the sound object passed from sketch.js
    this.isPlaying = false;

    this.createButtons();
    this.createSliders();
    this.setDefaultAudio();
  }

  setDefaultAudio() {
    const defaultAudioSrc = "audio/Franz_Ferdinand_This_Fire.mp3";
    this.loadAudioByUrl(defaultAudioSrc);
  }

  loadAudioByUrl(url) {
    this.audio.src = url;
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
      {
        class: "slider",
        id: "bassSlider",
        text: "Bass",
        function: this.bass.bind(this),
      },
      {
        class: "slider",
        id: "pitchSlider",
        text: "Pitch",
        function: this.pitch.bind(this),
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
    if (this.audio.src) {
      this.audio
        .play()
        .then(() => {
          console.log("Playing...");
          this.isPlaying = true;
        })
        .catch((error) => console.error("Error playing the file:", error));
    } else {
      console.log("No audio file loaded");
    }
  }

  stopSong() {
    console.log("Stop button clicked");
    if (!this.audio.paused) {
      this.audio.pause();
      this.audio.currentTime = 0; // Reset the audio position
      console.log("Audio stopped");
      this.isPlaying = false;
    }
  }

  pauseSong() {
    console.log("Pause button clicked");
    if (!this.audio.paused) {
      this.audio.pause();
      console.log("Audio paused");
      this.isPlaying = false;
    }
  }

  loopSong() {
    console.log("Loop button clicked");
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
      if (!this.audio.paused) {
        this.audio.pause(); // Stop the currently playing audio
        this.isPlaying = false;
      }

      // Load the new sound file into p5.js
      sound.stop(); // Stop the current sound if it's playing
      sound = loadSound(URL.createObjectURL(file));
      this.isPlaying = false; // Reset the play state

      // Assign the new audio source
      this.audio.src = URL.createObjectURL(file);
      console.log("File uploaded:", file.name);
    };
  }

  screenCapture() {
    console.log("Download button clicked");
    html2canvas(document.body)
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

  volume() {
    console.log("Volume Slider changed");
    // You can access the slider value using this.value
  }

  bass() {
    console.log("Bass Slider changed");
    // You can access the slider value using this.value
  }

  pitch() {
    console.log("Pitch Slider changed");
    // You can access the slider value using this.value
  }
}
