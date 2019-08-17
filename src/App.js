import React, { useState } from "react";
import Tune from "./Tune";
import { dbContext, useFirestore } from "./FirebaseConnection";
import TuneSelect from "./TuneSelect";
import styled from "styled-components";

const AppPage = styled.div`
  background-color: #282c34;
  height: calc(100vh);
  width: calc(100vw);
  overflow-x: hidden;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const App = () => {
  const { db } = useFirestore();
  const [tune, setTune] = useState();
  if (!db) {
    return "Loading...";
  }
  return (
    <dbContext.Provider value={{ db }}>
      <AppPage>
        <TuneSelect tune={tune} setTune={setTune} />
        {tune && <Tune path={tune.path} />}
      </AppPage>
    </dbContext.Provider>
  );
};

export default App;
