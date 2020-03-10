import "./sound-samples.css";
import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { dbContext } from "./FirebaseConnection";

const SoundSampleBox = styled.div`
  background: white;
  border-radius: 10px;
  position: relative;
  color: rgba(0, 0, 0, 0.6);
  align-items: center;
  padding-top: 8px;
`;

const SoundSampleDescription = styled.div`
  margin-left: 10px;
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
  display: flex !important;
  justify-content: center;
  left: 0;
  top: 0;
  height: 100%;
  font-size: 100px !important;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
`;

const SoundSamplePhrases = styled.div`
  display: flex;
  margin-left: 6px;
  flex-wrap: wrap;
`;

const PhraseButton = styled.div`
  width: fit-content;
  min-width: 32px;
  height: 32px;
  margin: 2px;
  background: orange;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  opacity: 0.8;
  cursor: pointer;
  padding: 0 4px;
`;

const SavePhraseButton = styled.div`
  border: 1px solid orange;
  border-radius: 4px;
  opacity: 0.8;
  display: flex;
  justify-content: center;
  align-items: center;
  color: orange;
  width: 32px;
  height: 30px;
  margin: 2px;
  box-sizing: content-box;
  cursor: pointer;
  font-size: 18px;
  transition: all 0.2s ease-out
  :hover {
    background: ${props => (props.editMode ? "red" : "orange")};
    color: white;
  }
`;

const SoundSample = ({
  description,
  startPoint,
  duration,
  onPlay,
  path,
  saveCurrentPointToPath
}) => {
  const { db, deleteDocument } = useContext(dbContext);
  const [phrases, setPhrases] = useState([]);
  const [editMode, setEditMode] = useState(false);

  const getPhrases = () => {
    db.collection(`${path}/phrases`)
      .get()
      .then(querySnapshot => {
        setPhrases(
          querySnapshot.docs.map(doc => {
            return { ...doc.data(), id: doc.id };
          })
        );
      });
  };

  useEffect(() => {
    getPhrases();
  }, [path]);
  console.log(editMode);
  return (
    <SoundSampleBox
      className={`sound-sample-box ${
        editMode ? "sound-sample-box--edit-mode" : ""
      }`}
    >
      {/* <PlayIcon
        onClick={event => {
          onPlay(startPoint, duration);
          event.stopPropagation();
        }}
        className="material-icons"
      >
        play_circle_outline
      </PlayIcon> */}
      <SoundSampleDescription>{description}</SoundSampleDescription>
      <SoundSamplePhrases>
        {phrases
          .sort((a, b) => a.start - b.start)
          .map((phrase, index) => (
            <PhraseButton
              className={`phrase-button`}
              onClick={event => {
                if (!editMode) {
                  onPlay(phrase.start);
                  event.stopPropagation();
                } else {
                  deleteDocument(path + "/phrases", phrase.id).then(() => {
                    console.log("deleted");
                    getPhrases();
                  });
                  // delete
                }
              }}
            >
              {`${Math.round(Number(phrase.start / 10)) / 100}s`}
            </PhraseButton>
          ))}
        {!editMode && (
          <SavePhraseButton
            onClick={() =>
              saveCurrentPointToPath(`${path}/phrases`).then(() => {
                getPhrases();
                console.log("did it");
              })
            }
          >
            +
          </SavePhraseButton>
        )}
      </SoundSamplePhrases>
      <SoundSampleTitle>
        <span>{startPoint}</span>
        <span>{duration}</span>
      </SoundSampleTitle>
      <i
        onClick={() => {
          setEditMode(!editMode);
        }}
        className="material-icons samples-edit-button"
      >
        {editMode ? "check" : "edit"}
      </i>
    </SoundSampleBox>
  );
};

SoundSample.propTypes = {
  description: PropTypes.string,
  startPoint: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  onPlay: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
  saveCurrentPointToPath: PropTypes.func.isRequired
};

export default SoundSample;
