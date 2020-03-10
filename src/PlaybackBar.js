import React, { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { PlayStates } from "./Tune";

const PlaybackBar = ({
  onChangeDurationByPercentage,
  onClickBar,
  percentage,
  startPercentage,
  seekPercentage,
  sound,
  playState
}) => {
  const requestRef = useRef();
  const [currentPoint, setCurrentPoint] = useState(0);
  // const step = () => {
  //   // console.log("its going");
  //   setCurrentPoint(sound.current ? sound.current.seek() : 0);
  //   requestRef.current = requestAnimationFrame(step);
  // };
  // // console.log("current point", currentPoint);
  // useEffect(() => {
  //   // console.log("STARTING ONE");
  //   if (playState === PlayStates.Playing) {
  //     requestRef.current = requestAnimationFrame(step);
  //   }
  //   return () => {
  //     // console.log("STOPPING ONE");
  //     cancelAnimationFrame(requestRef.current);
  //   };
  // }, [playState]);

  const width = `${seekPercentage}%`;
  return (
    <>
      <div className="duration-section flex-r-ai--cen">
        <div
          onClick={() => {
            onChangeDurationByPercentage(-1);
          }}
          className="rate-button"
        >
          -
        </div>

        <div className="duration-boxes flex-r">
          <div className="seeker-bar" style={{ width }} />
          <div
            onClick={event => {
              let rect = event.target.getBoundingClientRect();
              let x = event.clientX - rect.left;
              const percentageOfFull = (x / rect.width) * 100;
              console.log("CLICKED HERE WITH", percentageOfFull);
              onClickBar(percentageOfFull);
            }}
            className="duration-box duration-box--full"
          >
            <div
              className="duration-box duration-box--empty"
              style={{ width: startPercentage + "%" }}
            />
            <div
              className="duration-box duration-box--selected"
              style={{ width: percentage + "%" }}
            >
              <div
                onClick={() => {
                  console.log("CLICKED IT");
                  onClickBar(startPercentage);
                }}
                className="start-selector"
              />

              <div className="end-selector" />
            </div>
          </div>
        </div>
        <div
          onClick={() => {
            onChangeDurationByPercentage(1);
          }}
          className="rate-button"
        >
          +
        </div>
      </div>
    </>
  );
};

PlaybackBar.propTypes = {
  onChangeSoundRateByAmount: PropTypes.func.isRequired,
  onChangeDurationByPercentage: PropTypes.func.isRequired,
  onClickBar: PropTypes.func.isRequired,
  percentage: PropTypes.number,
  startPercentage: PropTypes.number,
  soundRate: PropTypes.number,
  seekPercentage: PropTypes.number,
  sound: PropTypes.object,
  playState: PropTypes.string
};

export default PlaybackBar;
