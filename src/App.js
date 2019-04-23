import React, { useState, useEffect } from "react";
import "./App.css";
import { Howl } from "howler";
//import mp3_file from "./4927.mp3";

const App = () => {
  const [sound, setSound] = useState(null);
  const [playingId, setPlaying] = useState(null);
  const [soundRate, setSoundRate] = useState(1);
  const [duration, setDuration] = useState(500);
  useEffect(() => {
    const newSound = new Howl({
      src: ["https://www.google.com/logos/fnbx/animal_sounds/frog.mp3"],
      html5: true,
      loop: true,
      sprite: {
        main: [0, duration]
      },
      rate: 1
    });
    setSound(newSound);
  }, []);
  const scale = 0.25;
  const fullDuration =
    sound && sound.duration() ? sound.duration() * 1000 : 2600;
  return (
    <div className="App">
      <header className="App-header">
        <div
          onClick={() => {
            if (playingId) {
              sound.stop();
              setPlaying(null);
            } else {
              const playing = sound.play("main");
              setPlaying(playing);
            }
          }}
          className={`play-button ${
            playingId !== null ? "play-button-playing" : ""
          }`}
        >
          {playingId !== null ? "Stop" : "Play"}
        </div>

        {sound && sound.duration() > 0 && (
          <>
            <div className="flex-r-ai--cen">
              <div
                className="rate-button rate-button--down"
                onClick={() => {
                  const newRate = soundRate - 0.1;
                  if (newRate >= 0.1) {
                    sound.rate(newRate);
                    setSoundRate(newRate);
                  }
                }}
              >
                -
              </div>
              <div className="rate-indicator">{`Speed: ${Math.round(
                soundRate * 10
              ) / 10}`}</div>
              <div
                className="rate-button rate-button--up"
                onClick={() => {
                  const newRate = soundRate + 0.1;
                  sound.rate(newRate);
                  setSoundRate(newRate);
                }}
              >
                +
              </div>
            </div>
            <div className="duration-section flex-r-ai--cen">
              <div
                onClick={() => {
                  if (duration - 100 >= 0) {
                    setDuration(duration - 100);
                    sound._sprite.main = [0, duration - 100];
                  }
                }}
                className="rate-button"
              >
                -
              </div>

              <div
                className="duration-boxes flex-r"
                style={{ width: fullDuration * scale }}
              >
                <div
                  className="duration-box duration-box--full"
                  style={{ width: fullDuration * scale }}
                >
                  <div
                    className="duration-box duration-box--selected"
                    style={{ width: duration * scale }}
                  />
                </div>
              </div>
              <div
                onClick={() => {
                  if (duration + 100 <= fullDuration) {
                    setDuration(duration + 100);
                    sound._sprite.main = [0, duration + 100];
                  }
                }}
                className="rate-button"
              >
                +
              </div>
            </div>
          </>
        )}
      </header>
    </div>
  );
};

export default App;
