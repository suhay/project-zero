"use client";
import { createContext, useState } from "react";

export const profileData = createContext({
  profileStatus: "",
  setProfileStatus: (status) => {
    console.log("in context status", status);
  },
});

const Context = ({ children }) => {
  const [profileStatus, setProfileStatus] = useState("");

  return (
    <profileData.Provider value={{ profileStatus, setProfileStatus }}>
      {children}
    </profileData.Provider>
  );
};

export default Context;
