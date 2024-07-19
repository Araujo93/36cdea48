import React, { useMemo, useRef, useCallback, useContext } from "react";

// react-icons
import { BsFillTelephoneInboundFill } from "react-icons/bs";
import { BsFillTelephoneOutboundFill } from "react-icons/bs";
import { MdPhoneMissed } from "react-icons/md";
import { MdArchive } from "react-icons/md";
import { MdUnarchive } from "react-icons/md";

// provider
import ContextProvider from "../../../../provider/index.jsx";

const CallDetails = ({ call, isOpen, onClick, archive }) => {
  const contentHeight = useRef();
  const { setArchived } = useContext(ContextProvider);

  // convert time duration from seconds into readable string => HH:MM:SS ago.
  const callDuration = useMemo(() => {
    let hours = "";
    let minutes = "";
    let seconds = "";
    const duration = new Date(call.duration * 1000).toISOString().slice(11, 19);
    const HMS = duration.split(":");
    const HMSNumber = HMS.map((el) => Number(el));

    if (HMSNumber[0] > 0) {
      hours += `${HMSNumber[0]} hours`;
    }
    if (HMSNumber[1] > 0) {
      minutes += `${HMSNumber[1]} mins`;
    }
    seconds += `${HMSNumber[2]} secs`;

    return `${hours} ${minutes} ${seconds}`;
  }, [call]);

  // render correct phone image based on call.direction && call.call_type
  const renderPhoneImage = useCallback(
    (call) => {
      if (call.direction === "inbound") {
        if (call.call_type === "answered") {
          return (
            <span className="phone_call">
              <BsFillTelephoneInboundFill className="inbound_call" />
              {call.from}
            </span>
          );
        } else {
          return (
            <span className="phone_call">
              <MdPhoneMissed className="inbound_missed_call" />
              {call.from}
            </span>
          );
        }
      }

      if (call.direction === "outbound") {
        if (call.call_type === "answered") {
          return (
            <span className="phone_call">
              <BsFillTelephoneOutboundFill className="outbound_call" />
              {call.from}
            </span>
          );
        } else {
          return (
            <span className="phone_call">
              <MdPhoneMissed className="outbound_missed_call" />
              {call.from}
            </span>
          );
        }
      }
    },
    [call],
  );

  return (
    <div className="call-details-container">
      <button
        className={`accoridian-main ${isOpen ? "active" : ""}`}
        onClick={onClick}
      >
        <p>{renderPhoneImage(call)}</p>
        {!isOpen && <p className="call_time">{call.time}</p>}
      </button>

      <div
        ref={contentHeight}
        className="accoridan-container"
        style={
          isOpen
            ? { height: contentHeight.current.scrollHeight }
            : { height: "0px" }
        }
      >
        <div className="accoridan-container-content">
          {call.call_type === "missed" && `${call.call_type} call`}

          {call.call_type === "answered" &&
            `${call.direction} call, ${callDuration}`}

          <div>{call.time}</div>
          <button
            className="archive-btn-small"
            onClick={() => setArchived(call)}
          >
            {!archive ? <MdArchive size={24} /> : <MdUnarchive size={24} />}
            <span className="btn_text">
              {!archive ? "Archive" : "Unarchive"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CallDetails;
