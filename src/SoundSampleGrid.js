import React from "react";
import styled from "styled-components";
import SoundSample from "./SoundSample";

const SoundSampleGridContainer = styled.div`
  padding: 16px;
  display: grid;
  grid-template-columns: 300px 300px;
  grid-auto-rows: 150px;
  grid-gap: 16px;
`;

const SoundSampleGrid = ({ onPlaySample }) => (
  <SoundSampleGridContainer>
    <SoundSample startPoint={0} duration={2000} onPlay={onPlaySample} />
    <SoundSample startPoint={2000} duration={10000} onPlay={onPlaySample} />
    <SoundSample startPoint={12000} duration={5000} onPlay={onPlaySample} />
  </SoundSampleGridContainer>
);

SoundSampleGrid.propTypes = {};

export default SoundSampleGrid;
