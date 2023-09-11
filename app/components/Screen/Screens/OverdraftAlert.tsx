import React from "react";
import { useCustomer } from "@/app/context/CustomerProvider";
import { useScreen } from "@/app/context/ScreenProvider";
import { ScreenType } from "./ScreensConsts";

function OverdraftAlert() {
  const {
    currentWithdrawal,
    currentBalance,
    currentOverdraft,
    overdraftLimit,
  } = useCustomer();
  const {setCurrentScreen} = useScreen();

  return (
    <section className="flex flex-col justify-center items-center text-primary h-full text-center">
      <h1 className="text-2xl mb-5">
        <span className="text-wrong">Alert:</span> Your withdrawal will exceed
        your main balance. The difference (
        <strong className="font-semibold">
          £{currentWithdrawal - currentBalance}
        </strong>
        ) will be taken from your overdraft limit (
        <strong className="font-semibold">
          £{overdraftLimit - currentOverdraft}
        </strong>
        )!
      </h1>
      <div className="flex justify-around w-full">
        <button
          className="bg-wrong hover:bg-wrong-dark active:bg-wrong-light w-[45%] py-2 rounded-md text-primary-light font-semibold"
          onClick={() => setCurrentScreen(ScreenType.WITHDRAWAL_FORM)}
        >
          Back
        </button>
        <button
          className="bg-right hover:bg-right-dark active:bg-right-light w-[45%] py-2 rounded-md text-primary-light font-semibold"
          onClick={() => setCurrentScreen(ScreenType.WITHDRAWAL_CONFIRMATION)}
        >
          Proceed
        </button>
      </div>
    </section>
  );
}

export default OverdraftAlert;
