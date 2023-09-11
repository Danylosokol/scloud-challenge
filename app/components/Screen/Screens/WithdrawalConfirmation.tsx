"use client";
import React, { useState, useEffect } from "react";
import { useCustomer } from "@/app/context/CustomerProvider";
import { useATM } from "@/app/context/ATMProvider";
import { useScreen } from "@/app/context/ScreenProvider";
import { ScreenType } from "./ScreensConsts";
import {
  brutAtmAlgo,
  addMissingNotes,
  fillZeroAmountNotes,
  balanceDistribution,
} from "@/app/utils/ATMLogic";
import { NotesType } from "@/types/ATM";

function WithdrawalConfirmation() {
  const {
    currentWithdrawal,
    setCurrentWithdrawal,
    currentBalance,
    setCurrentBalance,
    currentOverdraft,
    setCurrentOverdraft,
    overdraftLimit,
  } = useCustomer();
  const { currentNotes, setCurrentNotes } = useATM();
  const { setCurrentScreen } = useScreen();
  const [withdrawalNotes, setWithdrawalNotes] = useState<NotesType[] | null>(
    null
  );
  const [remainingNotes, setRemainingNotes] = useState<NotesType[]>(currentNotes);

  useEffect(() => {
    calculateWithdrawalNotes();
  }, []);

  const calculateWithdrawalNotes = () => {
    const notes: NotesType[] = currentNotes.map((obj) => ({ ...obj }));
    console.log("Notes:");
    console.log(notes);
    const result: NotesType[] = brutAtmAlgo(notes, currentWithdrawal);
    const resultComplete: NotesType[] = addMissingNotes(result, notes);
    const resultUnbalanced: NotesType[] = fillZeroAmountNotes(
      resultComplete,
      notes
    );
    const resultBalanced: NotesType[] = balanceDistribution(
      resultUnbalanced,
      notes
    );
    setWithdrawalNotes(resultBalanced);
    setRemainingNotes(notes);
  };

  const handleWithdrawal = () => {
    // Making PUT requests to DB to update customer's, ATM's and bank's data
    setCurrentNotes(remainingNotes);
    if(currentBalance < currentWithdrawal){
      const newOverdraft = currentOverdraft + (currentWithdrawal - currentBalance);
      setCurrentOverdraft(newOverdraft);
    }
    const newBalance = currentBalance < currentWithdrawal ? 0 : currentBalance - currentWithdrawal;
    setCurrentBalance(newBalance);
    setCurrentWithdrawal(0);
    setCurrentScreen(ScreenType.WITHDRAWAL_RESULT);
  };

  return (
    <section className="flex flex-col justify-center text-primary h-full">
      <h1 className="text-2xl mb-3 font-bold">Transaction confirmation:</h1>
      <ul className="mb-3 sm:mb-5 text-[.95rem] sm:text-base">
        <li className="mb-1.5">
          <b>You will withdraw:</b> £{currentWithdrawal}{" "}
          <span className="italic">{currentWithdrawal > currentBalance &&
            `(£${
              currentWithdrawal - currentBalance
            } will be taken from overdraft)`}</span>
        </li>
        {withdrawalNotes && (
          <li className="mb-1.5">
            <b>You will get:</b>{" "}
            {withdrawalNotes
              .map((note) => `${note.amount} × £${note.value}`)
              .join(", ")}
          </li>
        )}
        <li className="mb-1.5">
          <b>Current balance:</b> £{currentBalance}
        </li>
        <li>
          <b>Available overdraft:</b> £{overdraftLimit - currentOverdraft}
        </li>
      </ul>
      <section className="flex justify-between w-full">
        <button
          className="bg-secondary hover:bg-secondary-dark active:bg-secondary-light w-[45%] py-2 rounded-md"
          onClick={() => setCurrentScreen(ScreenType.WITHDRAWAL_FORM)}
        >
          Back
        </button>
        <button
          className="bg-secondary hover:bg-secondary-dark active:bg-secondary-light w-[45%] py-2 rounded-md"
          onClick={() => handleWithdrawal()}
        >
          Confirm
        </button>
      </section>
    </section>
  );
}

export default WithdrawalConfirmation;
