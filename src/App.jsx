import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

// context
import ContextProvider from "./provider/index.jsx";

// components
import Header from "./components/Header/Header.jsx";
import PhoneCallList from "./components/PhoneCallList/index.jsx";
import ArchiveCallList from "./components/ArchiveCallList/index.jsx";

// api
import { GetPhoneCalls } from "./api/PhoneCalls/index.jsx";
import { resetAllCallsToInitialState } from "./api/PhoneCalls/index.jsx";
import { setAllCallsToArchived } from "./api/PhoneCalls/index.jsx";
import { setArchivedCall } from "./api/PhoneCalls/index.jsx";

// types
import { InboxTypes } from "./types/InboxTypes.jsx";

const App = () => {
  const [callList, setCallList] = useState([]);
  const [archiveCallList, setArchiveCallList] = useState([]);
  const [dates, setDates] = useState([]);
  const [activeInbox, setActiveInbox] = useState(InboxTypes[0]);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    const callAPi = async () => {
      const { callList, archivedCalls, filteredDates } = await GetPhoneCalls();
      setCallList(callList);
      setArchiveCallList(archivedCalls);
      setDates(filteredDates);
    };

    callAPi();
  }, []);

  // reset calls to intiail state
  const resetCallState = async () => {
    const res = await resetAllCallsToInitialState();
    setCallList(res.callList);
    setArchiveCallList(res.archivedCalls);
    setActiveIndex(null);
  };

  // set a call to archive or remove from archive
  const setArchived = async (call) => {
    const res = await setArchivedCall(call.id, !call.is_archived);
    setCallList(res.callList);
    setArchiveCallList(res.archivedCalls);
    setActiveIndex(null);
  };

  // Archive all calls
  const setCallsToArchive = async (callList) => {
    const res = await setAllCallsToArchived(callList);
    setCallList([]);
    setArchiveCallList(res.archivedCalls);
    setActiveIndex(null);
  };

  const contextValues = {
    callList,
    setCallList,
    archiveCallList,
    setArchiveCallList,
    dates,
    setDates,
    activeIndex,
    setActiveIndex,
    setArchived,
  };

  return (
    <ContextProvider.Provider value={contextValues}>
      <div className="container">
        <Header active={activeInbox} setActive={setActiveInbox} />
        <div className="container-view">
          {activeInbox === InboxTypes[0] ? (
            <PhoneCallList
              archive={false}
              reset={resetCallState}
              setAllToArchive={setCallsToArchive}
            />
          ) : (
            <ArchiveCallList
              archive={true}
              resetCallState={resetCallState}
              setAllToArchive={setCallsToArchive}
            />
          )}
        </div>
      </div>
    </ContextProvider.Provider>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));

export default App;
