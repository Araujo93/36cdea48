import React, { useContext } from "react";

// components
import Tab from "./Tab/index.jsx";

// types
import { InboxTypes } from "../../types/InboxTypes.jsx";

// provider
import ContextProvider from "../../provider/index.jsx";

const TabGroup = ({ active, setActive }) => {
  const { setActiveIndex } = useContext(ContextProvider);

  const handleClick = (type) => {
    setActive(type);
    setActiveIndex(null);
  };

  return (
    <div className="tabgroup-container">
      {InboxTypes.map((type) => (
        <Tab
          key={type}
          active={active === type}
          onClick={() => handleClick(type)}
          type={type}
        />
      ))}
    </div>
  );
};

export default TabGroup;
