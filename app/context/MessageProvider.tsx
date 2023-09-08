"use client";
import React, {
  SetStateAction,
  createContext,
  useState,
  Dispatch,
  useContext,
} from "react";

interface MessageContext {
  message: string;
  setMessage: Dispatch<SetStateAction<string>>;
}

const MessageContext = createContext<MessageContext>({
  message: "",
  setMessage: () => {},
});

export const useMessage = () => {
  return useContext(MessageContext);
};

export const MessageProvider = ({ children }: { children: React.ReactNode }) => {
  const [message, setMessage] = useState("");
  return (
    <MessageContext.Provider value={{ message, setMessage }}>
      {children}
    </MessageContext.Provider>
  );
};
