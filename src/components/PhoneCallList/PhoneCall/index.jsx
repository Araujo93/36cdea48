import React, { useMemo, useContext } from "react";

// context
import ContextProvider from "../../../provider/index.jsx";

// components
import CallDetails from "./CallDetails/index.jsx";

const PhoneCall = ({ date, archive }) => {
  const { callList, archiveCallList, activeIndex, setActiveIndex } =
    useContext(ContextProvider);

  const handleItemClick = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  // filter calls into correct dates
  const filteredCalls = useMemo(() => {
    if (archive) {
      return archiveCallList.filter((el) => el.date === date);
    } else {
      return callList.filter((el) => el.date === date);
    }
  }, [date, callList, archive, archiveCallList]);

  return (
    <>
      {filteredCalls.length > 0 && (
        <div className="phone_list_container">
          <p className="phone_list_date">{date}</p>
          <div className="call_list">
            {filteredCalls.map((call) => (
              <div className="phone_call_container" key={call.id}>
                <CallDetails
                  key={call.id}
                  call={call}
                  isOpen={activeIndex === call.id}
                  onClick={() => handleItemClick(call.id)}
                  archive={archive}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default PhoneCall;
