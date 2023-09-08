"use client";
import React, {SetStateAction, createContext, useState, Dispatch, useContext} from "react";

interface IsOnContext {
  isOn: boolean;
  setIsOn: Dispatch<SetStateAction<boolean>>;
}

const IsOnContext = createContext<IsOnContext>({ isOn: false, setIsOn: () => {} });

export const useIsOn = () => {
  return useContext(IsOnContext);
};

export const IsOnProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOn, setIsOn] = useState(false);
  return <IsOnContext.Provider value={{isOn, setIsOn}}>{children}</IsOnContext.Provider>;
};