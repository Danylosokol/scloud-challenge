import React from 'react';
import { useATM } from "@/app/context/ATMProvider";
import { usePin } from '@/app/context/PinProvider';
import { useCustomer } from '@/app/context/CustomerProvider';
import { useScreen } from '@/app/context/ScreenProvider';
import { ScreenType } from './ScreensConsts';

function Menu() {
  const {setIsOn} = useATM();
  const {setIsPinValid} = usePin(); 
  const {currentBalance, currentOverdraft, overdraftLimit, setCurrentWithdrawal} = useCustomer();
  const {setCurrentScreen} = useScreen();

  return (
    <section className="flex flex-col justify-center text-primary h-full px-10">
      <h1 className="text-2xl mb-3">Account information:</h1>
      <ul className="mb-5">
        <li>
          <b>Your current balance:</b> £{currentBalance}
        </li>
        <li>
          <b>Your available overdraft:</b> £{overdraftLimit - currentOverdraft}
        </li>
      </ul>
      <h2 className="text-xl mb-3">Select an operation:</h2>
      <section className="flex justify-between w-full">
        <button
          className="bg-secondary hover:bg-secondary-dark active:bg-secondary-light w-[45%] py-2 rounded-md"
          onClick={() => setCurrentScreen(ScreenType.WITHDRAWAL_FORM)}
        >
          Withdrawal
        </button>
        <button
          className="bg-secondary hover:bg-secondary-dark active:bg-secondary-light w-[45%] py-2 rounded-md"
          onClick={() => {
            setIsPinValid(false);
            setCurrentWithdrawal(0);
            setIsOn(false);
          }}
        >
          End session
        </button>
      </section>
    </section>
  );
}

export default Menu