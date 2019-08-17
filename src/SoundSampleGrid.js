import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import SoundSample from "./SoundSample";
import { dbContext } from "./FirebaseConnection";

const SoundSampleGridContainer = styled.div`
  padding: 16px;
  display: grid;
  grid-template-columns: 300px 300px;
  grid-auto-rows: 150px;
  grid-gap: 16px;
`;

const SoundSampleGrid = ({ onPlaySample, path }) => {
  const { db } = useContext(dbContext);
  const [sections, setSections] = useState(null);
  useEffect(() => {
    db.collection(path)
      .get()
      .then(querySnapshot => {
        setSections(querySnapshot.docs.map(doc => doc.data()));
      });
  }, []);
  return (
    <SoundSampleGridContainer>
      {sections &&
        sections.map((section, index) => (
          <SoundSample
            key={index}
            startPoint={section.start}
            duration={section.end - section.start}
            onPlay={onPlaySample}
          />
        ))}
    </SoundSampleGridContainer>
  );
};

SoundSampleGrid.propTypes = { path: PropTypes.string.isRequired };

export default SoundSampleGrid;
