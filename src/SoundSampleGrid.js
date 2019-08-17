import React, { useContext, useState, useEffect } from "react";
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

const SoundSampleGrid = ({ onPlaySample }) => {
  const { db } = useContext(dbContext);
  const [sections, setSections] = useState(null);
  useEffect(() => {
    db.collection("sections")
      .get()
      .then(querySnapshot => {
        const data = querySnapshot.docs.map(doc => doc.data());
        console.log(data);
        setSections(data);
      });
  }, []);
  console.log("sections DATA", sections);
  return (
    <SoundSampleGridContainer>
      {sections &&
        sections.map((section, index) => (
          <SoundSample
            key={index}
            startPoint={section.start}
            duration={section.duration}
            onPlay={onPlaySample}
          />
        ))}
    </SoundSampleGridContainer>
  );
};

SoundSampleGrid.propTypes = {};

export default SoundSampleGrid;
