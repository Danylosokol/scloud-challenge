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
  currentNotes: NotesType[];
  setCurrentNotes: Dispatch<SetStateAction<NotesType[]>>;
}

const ATMContext = createContext<IsOnContext>({
  isOn: false,
  setIsOn: () => {},
  currentNotes: notes,
  setCurrentNotes: () => {},
});

export const useATM = () => {
  return useContext(ATMContext);
};

export const ATMProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOn, setIsOn] = useState(false);
  const [currentNotes, setCurrentNotes] = useState(notes);
  return (
    <ATMContext.Provider
      value={{ isOn, setIsOn, currentNotes, setCurrentNotes }}
    >
      {children}
    </ATMContext.Provider>
  );
};
