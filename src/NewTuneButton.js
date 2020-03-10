import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const StyledNewTuneButton = styled.i`
  color: green;
  height: 32px !important;
  width: 32px !important;
`;

const NewTuneButton = ({ onSubmitNewTune }) => {
  return (
    <StyledNewTuneButton onClick={onSubmitNewTune} className="material-icons">
      add_circle_outline
    </StyledNewTuneButton>
  );
};

NewTuneButton.propTypes = {
  onSubmitNewTune: PropTypes.func.isRequired
};

export default NewTuneButton;
