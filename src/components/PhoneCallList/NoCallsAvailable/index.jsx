import React from "react";

// react-icons
import { PiPhoneXFill } from "react-icons/pi";
import { HiMiniArchiveBoxXMark } from "react-icons/hi2";

const NoCallsAvailable = ({ archive }) => {
  return (
    <div className="no_calls_container">
      <p className="no_calls_text">
        There are no calls available in the {!archive ? "Inbox" : "Archive"}
      </p>
      {archive && (
        <p className="no_calls_text">You can archive calls from your inbox</p>
      )}

      {!archive ? (
        <PiPhoneXFill size={60} />
      ) : (
        <HiMiniArchiveBoxXMark size={60} />
      )}
    </div>
  );
};

export default NoCallsAvailable;
