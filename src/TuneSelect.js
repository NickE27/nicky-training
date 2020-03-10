import React, { useEffect, useContext, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Select from "react-select";
import { dbContext } from "./FirebaseConnection";

const TuneSelectBox = styled.div`
  display: flex;
  flex-direction: row;
  width: fit-content;
`;

const customStyles = {
  option: provided => ({
    ...provided
  }),
  control: provided => ({
    ...provided,
    width: "fit-content",
    background: "transparent",
    color: "black",
    border: "none",
    boxShadow: "none"
  }),
  indicatorSeparator: () => ({}),
  placeholder: () => ({
    fontSize: "24px",
    color: "white"
  }),
  singleValue: () => ({
    fontSize: "24px",
    color: "white"
  })
};

const TuneSelect = ({ tune, setTune }) => {
  const { db } = useContext(dbContext);
  const [tuneOptions, setTuneOptions] = useState();
  useEffect(() => {
    db.collection("tunes")
      .get()
      .then(querySnapshot => {
        const options = querySnapshot.docs.map(doc => ({
          value: doc.ref.id,
          label: doc.data().name,
          path: doc.ref.path
        }));
        setTuneOptions(options);
        if (options.length > 1) {
          setTune(options[1]);
        }
      });
  }, []);
  return (
    <TuneSelectBox>
      <Select
        styles={customStyles}
        disabled={!tuneOptions}
        value={tune}
        onChange={setTune}
        options={tuneOptions}
        placeholder={!tuneOptions ? "Loading" : "Select a tune"}
      />
    </TuneSelectBox>
  );
};

TuneSelect.propTypes = {
  tune: PropTypes.object,
  setTune: PropTypes.func.isRequired
};

export default TuneSelect;
