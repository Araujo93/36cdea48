import React, { useContext, useEffect } from "react";

// components
import NoCallsAvailable from "../PhoneCallList/NoCallsAvailable/index.jsx";
import PhoneCall from "../PhoneCallList/PhoneCall/index.jsx";

// react-icons
import { MdUnarchive } from "react-icons/md";

// provider
import ContextProvider from "../../provider/index.jsx";

const ArchiveCallList = ({ archive, resetCallState }) => {
  const { archiveCallList, dates } = useContext(ContextProvider);

  useEffect(() => {}, [archiveCallList]);
  return (
    <div className="call_list_container">
      {archiveCallList.length <= 0 ? (
        <NoCallsAvailable archive={archive} />
      ) : (
        <>
          <button className="archive-btn" onClick={() => resetCallState()}>
            <MdUnarchive size={24} />
            <span className="btn_text">Unarchive all calls</span>
          </button>

          {dates.map((date, i) => (
            <PhoneCall key={i} date={date} archive={true} />
          ))}
        </>
      )}
    </div>
  );
};

export default ArchiveCallList;
