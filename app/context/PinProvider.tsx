"use client";
import React, {
  SetStateAction,
  createContext,
  useState,
  Dispatch,
  useContext,
} from "react";

interface PinContext {
  pin: string;
  setPin: Dispatch<SetStateAction<string>>;
  isPinValid: boolean;
  setIsPinValid: Dispatch<SetStateAction<boolean>>;
}

const PinContext = createContext<PinContext>({
  pin: "",
  setPin: () => {},
  isPinValid: false,
  setIsPinValid: () => {},
});

export const usePin = () => {
  return useContext(PinContext);
};

export const PinProvider = ({ children }: { children: React.ReactNode }) => {
  const [pin, setPin] = useState("");
  const [isPinValid, setIsPinValid] = useState(false);
  return (
    <PinContext.Provider value={{ pin, setPin, isPinValid, setIsPinValid }}>
      {children}
    </PinContext.Provider>
  );
};
