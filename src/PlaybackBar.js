import React from "react";
import PropTypes from "prop-types";

const PlaybackBar = ({ onChangeDurationByPercentage, percentage }) => (
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
        <div
          onClick={event => {
            let rect = event.target.getBoundingClientRect();
            let x = event.clientX - rect.left;
            console.log((x / rect.width) * 100);
            const percentageOfFull = (x / rect.width) * 100;
            onChangeDurationByPercentage(percentageOfFull - percentage);
          }}
          className="duration-box duration-box--full"
        >
          <div
            className="duration-box duration-box--selected"
            style={{ width: percentage + "%" }}
          />
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

PlaybackBar.propTypes = {
  onChangeSoundRateByAmount: PropTypes.func.isRequired,
  onChangeDurationByPercentage: PropTypes.func.isRequired,
  percentage: PropTypes.number,
  soundRate: PropTypes.number
};

export default PlaybackBar;
