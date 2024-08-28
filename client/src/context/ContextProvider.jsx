// context/ContextProvider.js
import React, { createContext, useContext, useState } from "react";

const StateContext = createContext();

function ContextProvider({ children }) {
  const [role, setRole] = useState("");
  const [isLoginUser, setIsLoginUser] = useState(localStorage.getItem("user"));
  const [timeZoneVal, setTimeZoneVal] = useState("");
  const [messageList, setMessageList] = useState([]);

  return (
    <StateContext.Provider
      value={{
        isLoginUser,
        setIsLoginUser,
        role,
        setRole,
        timeZoneVal,
        setTimeZoneVal,
        messageList,
        setMessageList
      }}
    >
      {children}
    </StateContext.Provider>
  );
}

export default ContextProvider;

export const useStateContext = () => useContext(StateContext);
