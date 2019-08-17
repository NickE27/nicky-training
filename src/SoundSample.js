import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const SoundSampleBox = styled.div`
  background: white;
  border-radius: 10px;
  position: relative;
  color: rgba(0, 0, 0, 0.6);
  align-items: center;
  padding-top: 8px;
`;

const SoundSampleTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: orange;
  padding: 0 8px;
  box-sizing: border-box;
  height: 32px;
  width: 100%;
  font-weight: 300;
  position: absolute;
  bottom: 0px;
  color: white;
  border-radius: 0 0 10px 10px;
  opacity: 0.8;
`;

const PlayIcon = styled.i`
  position: absolute;
  padding-top: 8px;
  width: 100%;
  left: 0;
  top: 0;
  height: 100%;
  font-size: 100px !important;
  cursor: pointer;
  background: rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease-in-out;
  &:hover {
    background: transparent;
  }
`;

const SoundSample = ({ startPoint, duration, onPlay }) => (
  <SoundSampleBox>
    <PlayIcon
      onClick={() => {
        onPlay(startPoint, duration);
      }}
      className="material-icons"
    >
      play_circle_outline
    </PlayIcon>
    <SoundSampleTitle>
      <span>{startPoint}</span>
      <span>{duration}</span>
    </SoundSampleTitle>
  </SoundSampleBox>
);

SoundSample.propTypes = {
  startPoint: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  onPlay: PropTypes.func.isRequired
};

export default SoundSample;
