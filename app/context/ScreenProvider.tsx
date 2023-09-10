"use client";
import React, {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { ScreenType } from "../components/Screen/Screens/ScreensConsts";

interface ScreenContext {
  currentScreen: ScreenType;
  setCurrentScreen: Dispatch<SetStateAction<ScreenType>>;
}

const ScreenContext = createContext<ScreenContext>({
  currentScreen: ScreenType.GREETING,
  setCurrentScreen: () => {},
});

export const useScreen = () => {
  return useContext(ScreenContext);
}

export const ScreenProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentScreen, setCurrentScreen] = useState(ScreenType.GREETING);
  return (
    <ScreenContext.Provider
      value={{ currentScreen, setCurrentScreen }}
    >{children}</ScreenContext.Provider>
  );
};
