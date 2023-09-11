import React from 'react';
import { useScreen } from "@/app/context/ScreenProvider";
import { ScreenType } from "./ScreensConsts";
import { usePin } from '@/app/context/PinProvider';
import { useATM } from '@/app/context/ATMProvider';

function WithdrawalResult() {
  const { setCurrentScreen } = useScreen();
  const {setIsPinValid} = usePin();
  const {setIsOn} = useATM();

  return (
    <section className="flex flex-col justify-center items-center text-primary h-full">
      <h1 className="text-2xl mb-2 font-bold">Transaction was successful!</h1>
      <h2 className="text-1xl mb-10">Thank you for using ScreenCloud ATM!</h2>
      <section className="flex justify-between w-full">
        <button
          className="bg-secondary hover:bg-secondary-dark active:bg-secondary-light w-[45%] py-2 rounded-md"
          onClick={() => setCurrentScreen(ScreenType.MENU)}
        >
          Menu
        </button>
        <button
          className="bg-secondary hover:bg-secondary-dark active:bg-secondary-light w-[45%] py-2 rounded-md"
          onClick={() => {
            setIsPinValid(false);
            setIsOn(false);
          }}
        >
          End session
        </button>
      </section>
    </section>
  );
}

export default WithdrawalResult