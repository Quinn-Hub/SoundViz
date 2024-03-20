# Welcome to SoundViz!

SoundViz is all about having one audio visualizer that is able to toggle between layers to see the different effects that audio can make. We have implemented upload, download, and various audio control functionalities to act as a music player that allows the user to play music and enjoy the beautiful art that unfolds in front of them. Watch and be immersed in our creative art show piece as our project, SoundViz, comes to life!

>Experience the fun here: [https://quinn-hub.github.io/SoundViz/](https://quinn-hub.github.io/SoundViz/)


## Credits
Michael Quinn
Lukas Licon
Daniel Do
Reuben Chavez
Tien Le

Made for the CMPM 169: Creative Coding class at UCSC, Winter 2024.

## Theoretical Analysis
In crafting our project, we aimed to make controlled chaos through our individuality by having each layer serve as an example of our individual expression. We sought to make a fusion of manipulating layers of visuals that are influenced by sound and manipulating the sound itself to create artistic chaos through individuality. Our project stands to be a testament to embrace the diversity of artistic intent amidst the chaos.

  

We were inspired by using the sound library from p5.js and some of the examples that were shown in the lectures. Some of which represent ideas that we used in our final version of the project. For example, we were inspired by using the sound library to influence visuals based on the frequency of the music.

  

These examples were used as inspiration from the lectures on sound art as a starting point. We did not replicate the code but we admired the concepts held within these examples and thought about how we could create emergent art through likewise algorithms.

>Example 1: [https://openprocessing.org/sketch/1806074](https://openprocessing.org/sketch/1806074)
>Example 2: [https://openprocessing.org/sketch/1800102](https://openprocessing.org/sketch/1800102)
>Example 3: [https://openprocessing.org/sketch/1782562](https://openprocessing.org/sketch/1782562)

## Technical Analysis

Our website features a simple audio visualizer implemented using p5.sound library. The technical aspects of our site include various functionalities and controls for manipulating audio playback and visual effects. Our site comprises audio controls for playing, pausing, stopping, and looping audio tracks, as well as for uploading music and downloading screenshots directly from the website. Additionally, there is a full-screen toggle button for expanding the visualizer to full-screen mode. Users can adjust audio and music pan using sliders provided on the interface. 

The visualizer itself is interactive, with buttons overlaying the visualization to toggle between different visual effects. The visualization includes dynamic elements such as explosions, equalizer bars, and particle effects synchronized with the audio spectrum. The implementation involves using FFT analysis to extract audio data for visualization, along with custom algorithms for generating visual effects. The site architecture utilizes HTML, CSS, jQuery, and JavaScript with the p5.js library for audio visualization and user interaction. The technical design ensures a seamless and immersive audio-visual experience for users interacting with the website.