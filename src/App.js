import React, { useState } from "react";
import Tune from "./Tune";
import { dbContext, useFirestore } from "./FirebaseConnection";
import TuneSelect from "./TuneSelect";
import styled from "styled-components";
// import NewTuneButton from "./NewTuneButton";

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

const AppHeader = styled.header`
  padding: 8px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const App = () => {
  const firestore = useFirestore();
  const [tune, setTune] = useState();
  if (!firestore.db) {
    return "Loading...";
  }
  return (
    <dbContext.Provider value={firestore}>
      <AppPage>
        <AppHeader>
          <TuneSelect tune={tune} setTune={setTune} />
          {/* <NewTuneButton onSubmitNewTune={() => {}} /> */}
        </AppHeader>
        {tune && <Tune path={tune.path} />}
      </AppPage>
    </dbContext.Provider>
  );
};

export default App;
