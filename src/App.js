import React, { useState, useEffect } from "react";
import "./App.css";
import { Howl } from "howler";
import SoundSampleGrid from "./SoundSampleGrid";
import PlaybackBar from "./PlaybackBar";
//import mp3_file from "./4927.mp3";

const App = () => {
  const [sound, setSound] = useState(null);
  const [playingId, setPlaying] = useState(null);
  const [soundRate, setSoundRate] = useState(1);
  const [duration, setDuration] = useState(500);
  const [url, setUrl] = useState(
    "https://www.google.com/logos/fnbx/animal_sounds/frog.mp3"
  );
  const [inputString, setInputString] = useState("");

  const onPlaySample = (start, duration) => {
    console.log("PLAYING SAMPLE", start, duration);
  };

  useEffect(() => {
    const newSound = new Howl({
      src: [url],
      html5: true,
      loop: true,
      sprite: {
        main: [0, duration]
      },
      rate: 1
    });
    setSound(newSound);
  }, [url]);
  const fullDuration =
    sound && sound.duration() ? sound.duration() * 1000 : 2600;
  const percentage = (duration / fullDuration) * 100;
  const onePercent = fullDuration / 100;

  const onChangeSoundRateByAmount = amount => {
    const newRate = soundRate + amount;
    if (newRate >= 0.1) {
      sound.rate(newRate);
      setSoundRate(newRate);
    }
  };

  const onChangeDurationByPercentage = percentage => {
    const amount = onePercent * percentage;
    if (duration + amount <= fullDuration) {
      setDuration(duration + amount);
      sound._sprite.main = [0, duration + amount];
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="url-input">
          <input
            onChange={event => {
              console.log(event);
              setInputString(event.target.value);
            }}
            placeholder="Enter a URL"
            value={inputString}
          />
          <button
            onClick={() => {
              setUrl(inputString);
            }}
          >
            Go
          </button>
        </div>
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
          {playingId !== null ? "Pop you off!" : "Pop you on!"}
        </div>
        <SoundSampleGrid onPlaySample={onPlaySample} />

        {sound && sound.duration() > 0 && (
          <>
            <div className="flex-r-ai--cen">
              <div
                className="rate-button rate-button--down"
                onClick={() => {
                  onChangeSoundRateByAmount(-0.1);
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
                  onChangeSoundRateByAmount(0.1);
                }}
              >
                +
              </div>
            </div>
            <PlaybackBar
              onChangeDurationByPercentage={onChangeDurationByPercentage}
              onChangeSoundRateByAmount={onChangeSoundRateByAmount}
              percentage={percentage}
              soundRate={soundRate}
            />
          </>
        )}
      </header>
    </div>
  );
};

export default App;
