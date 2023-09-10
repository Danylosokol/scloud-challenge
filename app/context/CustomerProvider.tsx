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
  currentOverdraft: number;
  setCurrentOverdraft: Dispatch<SetStateAction<number>>;
  overdraftLimit: number;
}

const CustomerContext = createContext<CustomerContext>({
  currentBalance: 0,
  setCurrentBalance: () => {},
  currentWithdrawal: 0,
  setCurrentWithdrawal: () => {},
  currentOverdraft: 0,
  setCurrentOverdraft: () => {},
  overdraftLimit: 100,
});

export const useCustomer = () => {
  return useContext(CustomerContext);
};

export const CustomerProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentBalance, setCurrentBalance] = useState(0);
  const [currentWithdrawal, setCurrentWithdrawal] = useState(0);
  const [currentOverdraft, setCurrentOverdraft] = useState(0);
  const overdraftLimit = 100;
  return (
    <CustomerContext.Provider
      value={{
        currentBalance,
        setCurrentBalance,
        currentWithdrawal, 
        setCurrentWithdrawal,
        currentOverdraft,
        setCurrentOverdraft,
        overdraftLimit,
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
};
