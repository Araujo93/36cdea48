import React, { useContext } from "react";

// Provider
import ContextProvider from "../../../provider/index.jsx";

// types
import { InboxTypes } from "../../../types/InboxTypes.jsx";

const Tab = ({ active, type, onClick }) => {
  const { archiveCallList } = useContext(ContextProvider);

  return (
    <button
      key={type}
      className="header-tab"
      style={{
        borderBottom: active && `2px solid blue`,
        color: !active && "#B8B8B8",
      }}
      onClick={onClick}
    >
      {type === InboxTypes[1] ? (
        <>
          {archiveCallList.length > 0 && (
            <div className={"badge"}>
              <p>{archiveCallList.length}</p>
            </div>
          )}
          {type}
        </>
      ) : (
        type
      )}
    </button>
  );
};

export default Tab;
