import React, { useState, useEffect, useContext, useRef } from "react";
import "./App.css";
import { Howl } from "howler";
import SoundSampleGrid from "./SoundSampleGrid";
import PlaybackBar from "./PlaybackBar";
import PropTypes from "prop-types";
import styled from "styled-components";
import { dbContext } from "./FirebaseConnection";

//import mp3_file from "./4927.mp3";
export const PlayStates = {
  Playing: "playing",
  Stopped: "stopped"
};

const ControlsSection = styled.div`
  background: white;
  height: 48px;
  display: flex;
  align-items: center;
  border-radius: 25px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  padding: 0 8px;
`;

const Tune = ({ path }) => {
  const { addDocument } = useContext(dbContext);

  const sound = useRef(null);
  const [soundRate, setSoundRate] = useState(1);
  const requestRef = useRef();
  const [playState, setPlayState] = useState(PlayStates.Stopped);
  const [duration, setDuration] = useState(10000);
  const [startPoint, setStartPoint] = useState(0);
  const [seekPercentage, setSeekPercentage] = useState(0);
  const playingId = useRef(null);
  const [lastSelectedPoint, setLastSelectedPoint] = useState(0);

  const saveCurrentPointToPath = (path, name) => {
    console.log("save", sound.current.seek() * 1000);
    return addDocument({
      path,
      name,
      data: {
        start: sound.current.seek() * 1000,
        updated: new Date().toUTCString()
      }
    });
  };

  const setSound = value => {
    sound.current = value;
  };

  const [fullDuration, setFullDuration] = useState();
  const [url, setUrl] = useState(
    // "https://www.google.com/logos/fnbx/animal_sounds/frog.mp3"
    // "https://www.free-stock-music.com/music/mixaund-stay-positive.mp3"
    // "http://www.52weeksofblues.com/wp-content/uploads/2014/11/Rev.-Gary-Davis-Death-Dont-Have-No-Mercy-.mp3"
    "./cool-blues.mp3"
    // "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/KieLoKaz/Free_Ganymed/KieLoKaz_-_03_-_Wow_Kielokaz_ID_359.mp3"
  );
  const [inputString, setInputString] = useState("");

  const percentage = (duration / fullDuration) * 100;
  const onePercent = fullDuration / 100;

  useEffect(() => {
    if (playState === PlayStates.Playing) {
      const newSeek = (seekPercentage * onePercent) / 1000;
      console.log("now were playing. seek away to ", newSeek);
      sound.current.seek((seekPercentage * onePercent) / 1000);
    }
  }, [playState]);

  useEffect(() => {
    console.log("URL CHANGED", url);
    const newSound = new Howl({
      src: [url],
      html5: true,
      loop: true,
      rate: 1
    });
    // newSound.on("error", err => {
    //   console.log("ERROR", err);
    // });
    newSound.on("load", () => {
      console.log("loaded new sound");
      const newFullDuration = newSound.duration() * 1000;
      setFullDuration(newFullDuration);
      newSound._sprite["main"] = [0, newFullDuration];
      setDuration(newFullDuration);
    });
    newSound.on("seek", () => {
      console.log(
        "seek",
        sound.current ? sound.current.seek() : "no current sound to seek"
      );
    });
    newSound.on("rate", () => {
      // console.log(newSound.rate());
    });
    newSound.on("play", () => {
      setPlayState(PlayStates.Playing);
    });
    newSound.on("stop", () => {
      setPlayState(PlayStates.Stopped);
    });
    setSound(newSound);
  }, [url]);

  const onChangeSoundRateByAmount = amount => {
    const newRate = soundRate + amount;
    if (newRate >= 0.1) {
      sound.current.rate(newRate);
      setSoundRate(newRate);
    }
  };

  const onSelectSampleRange = (start, duration) => {
    onSetStartPoint(start);
    setDuration(duration);
    setSeekPercentage((start / fullDuration) * 100);
  };

  const onSelectSamplePoint = point => {
    setSeekPercentage((point / fullDuration) * 100);
    setLastSelectedPoint(point);
  };

  const onPlaySample = (start, duration) => {
    onSetStartPoint(start);
    if (duration) {
      setDuration(duration);
    } else {
      setDuration(fullDuration - start);
    }
    setSeekPercentage((start / fullDuration) * 100);
  };

  const onChangeDurationByPercentage = percentage => {
    console.log("onChangeDurationByPercentage");
    const amount = onePercent * percentage;
    if (duration + amount <= fullDuration) {
      setDuration(duration + amount);
      sound.current._sprite.main = [startPoint, duration + amount];
    }
  };

  const onSetStartPoint = start => {
    console.log("setStartPoint", start);
    setStartPoint(start);
    // sound.current.stop();
    sound.current.seek(start / 1000);
  };

  const onSeekToPercentage = percentage => {
    console.log("onSeekToPercentage", percentage);
    console.log("current sound", sound.current);
    sound.current.seek((percentage * onePercent) / 1000, playingId.current);
    setSeekPercentage(percentage);
  };
  return (
    <>
      <div className="new-tune-button" />
      <div className="url-input">
        <input
          onChange={event => {
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
      <ControlsSection>
        <div
          onClick={() => {
            sound.current.stop();
            playingId.current = sound.current.play("main");
          }}
          className={`material-icons restart-button ${
            playingId.current ? "" : "restart-button--disabled"
          }`}
        >
          refresh
        </div>
        <div
          onClick={() => {
            if (playingId.current) {
              sound.current.stop();
              playingId.current = null;
            } else {
              // onSeekToPercentage(seekPercentage);
              playingId.current = sound.current.play("main");
              console.log("current id", playingId.current);
              onSeekToPercentage(seekPercentage);
            }
          }}
          title={playingId.current !== null ? "Pop you off!" : "Pop you on!"}
          className={`play-button material-icons ${
            playingId.current !== null ? "play-button-playing" : ""
          }`}
        >
          {playingId.current === null ? "play_arrow" : "stop"}
        </div>
      </ControlsSection>
      <PlaybackBar
        onChangeDurationByPercentage={onChangeDurationByPercentage}
        onChangeSoundRateByAmount={onChangeSoundRateByAmount}
        onSetStartPoint={onSetStartPoint}
        percentage={percentage}
        startPercentage={(startPoint / fullDuration) * 100}
        soundRate={soundRate}
        sound={sound}
        seekPercentage={seekPercentage}
        onClickBar={onSeekToPercentage}
        playState={playState}
      />
      <SoundSampleGrid
        path={`${path}/sections`}
        onPlaySample={onPlaySample}
        saveCurrentPointToPath={saveCurrentPointToPath}
      />
      <div onClick={() => console.log(sound.current.seek())}>click me</div>
      {sound.current && sound.current.duration() > 0 && (
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
        </>
      )}
    </>
  );
};

Tune.propTypes = {
  path: PropTypes.string.isRequired
};

export default Tune;
