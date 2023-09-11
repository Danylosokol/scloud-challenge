"use client";
import React, {
  SetStateAction,
  createContext,
  useState,
  Dispatch,
  useContext,
} from "react";
import { notes } from "../utils/ATMConsts";
import { NotesType } from "@/types/ATM";

interface IsOnContext {
  isOn: boolean;
  setIsOn: Dispatch<SetStateAction<boolean>>;
  giveCash: boolean;
  setGiveCash: Dispatch<SetStateAction<boolean>>;
  currentNotes: NotesType[];
  setCurrentNotes: Dispatch<SetStateAction<NotesType[]>>;
}

const ATMContext = createContext<IsOnContext>({
  isOn: false,
  setIsOn: () => {},
  giveCash: false,
  setGiveCash: () => {},
  currentNotes: notes,
  setCurrentNotes: () => {},
});

export const useATM = () => {
  return useContext(ATMContext);
};

export const ATMProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOn, setIsOn] = useState(false);
  const [giveCash, setGiveCash] = useState(false);
  const [currentNotes, setCurrentNotes] = useState(notes);
  return (
    <ATMContext.Provider
      value={{ isOn, setIsOn, giveCash, setGiveCash, currentNotes, setCurrentNotes }}
    >
      {children}
    </ATMContext.Provider>
  );
};
