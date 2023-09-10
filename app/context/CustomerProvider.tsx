"use client";
import React, {
  SetStateAction,
  createContext,
  useState,
  Dispatch,
  useContext,
} from "react";

interface CustomerContext {
  currentBalance: number;
  setCurrentBalance: Dispatch<SetStateAction<number>>;
  currentWithdrawal: number;
  setCurrentWithdrawal: Dispatch<SetStateAction<number>>;
  currentOverdrawn: number;
  setCurrentOverdrawn: Dispatch<SetStateAction<number>>;
  overdrawnLimit: number;
}

const CustomerContext = createContext<CustomerContext>({
  currentBalance: 0,
  setCurrentBalance: () => {},
  currentWithdrawal: 0,
  setCurrentWithdrawal: () => {},
  currentOverdrawn: 0,
  setCurrentOverdrawn: () => {},
  overdrawnLimit: 100,
});

export const useCustomer = () => {
  return useContext(CustomerContext);
};

export const CustomerProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentBalance, setCurrentBalance] = useState(0);
  const [currentWithdrawal, setCurrentWithdrawal] = useState(0);
  const [currentOverdrawn, setCurrentOverdrawn] = useState(0);
  const overdrawnLimit = 100;
  return (
    <CustomerContext.Provider
      value={{
        currentBalance,
        setCurrentBalance,
        currentWithdrawal, 
        setCurrentWithdrawal,
        currentOverdrawn,
        setCurrentOverdrawn,
        overdrawnLimit,
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
};
