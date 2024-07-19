import React, { useContext } from "react";

// components
import PhoneCall from "./PhoneCall/index.jsx";
import NoCallsAvailable from "./NoCallsAvailable/index.jsx";

// react-icons
import { MdArchive } from "react-icons/md";

// provider
import ContextProvider from "../../provider/index.jsx";

const PhoneCallList = ({ archive, setAllToArchive }) => {
  const { callList, dates } = useContext(ContextProvider);

  return (
    <div>
      {callList.length <= 0 ? (
        <NoCallsAvailable archive={archive} />
      ) : (
        <>
          <button
            className="archive-btn"
            onClick={() => setAllToArchive(callList)}
          >
            <MdArchive size={24} />
            <span className="btn_text">Archive all calls</span>
          </button>

          {dates.map((date, i) => (
            <PhoneCall key={i} date={date} archive={archive} />
          ))}
        </>
      )}
    </div>
  );
};

export default PhoneCallList;
