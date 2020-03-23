import React, { Component } from "react";
import "./App.css";

class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playingUrl: "",
      audio: null,
      playing: false
    };
  }

  playAudio(mp3Url) {
    let audio = new Audio(mp3Url);
    if (!this.state.playing) {
      audio.play();
      this.setState({
        playingUrl: mp3Url,
        playing: true,
        audio
      });
    } else if (this.state.playingUrl === mp3Url) {
      this.state.audio.pause();
      this.setState({
        playing: false
      });
    } else {
      this.state.audio.pause();
      audio.play();
      this.setState({
        playingUrl: mp3Url,
        playing: true,
        audio
      });
    }

    // var playPromise = audio.play();
    // if (playPromise !== undefined) {
    //   playPromise
    //     .then(function() {
    //       console.log("live");
    //       // Automatic playback started!
    //     })
    //     .catch(function(error) {
    //       console.log("dead");
    //       // Automatic playback failed.
    //       // Show a UI element to let the user manually start playback.
    //     });
    // }
  }

  render() {
    const { tracks } = this.props;
    const urlMusic = "../file/DauTroi.mp3";
    const sss = "";
    const urlMusic2 =
      "https://drive.google.com/file/d/0BwWI0IJ_ImFvQU1IQVFxSHFOcHc/preview";
    return (
      <div>
        {tracks.map((track, k) => {
          const trackImage = "https://images.punkapi.com/v2/34.png";
          return (
            <div
              key={k}
              className="track"
              onClick={() => this.playAudio(urlMusic)}
            >
              <img src={trackImage} className="track-img" alt="track" />
              <div className="track-play">
                <div className="track-play-inner">
                  {this.state.playingUrl === "lam" ? (
                    <span>||</span>
                  ) : (
                    <span>&#9654;</span>
                  )}
                </div>
              </div>
              <p className="track-text">{track.name}</p>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Gallery;
