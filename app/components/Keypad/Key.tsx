import React from "react";
import { usePin } from "@/app/context/PinProvider";
import { useCustomer } from "@/app/context/CustomerProvider";
import { useScreen } from "@/app/context/ScreenProvider";
import { ScreenType } from "../Screen/Screens/ScreensConsts";

function Key({ value, disabled }: { value: string; disabled: boolean }) {
  const { setPin, isPinValid } = usePin();
  const { setCurrentWithdrawal } = useCustomer();
  const { currentScreen } = useScreen();

  return (
    <div>
      <button
        className="bg-primary-lighter hover:bg-primary-light active:bg-light text-primary h-14 w-14 rounded-md disabled:cursor-not-allowed disabled:hover:bg-primary-lighter shadow-md"
        disabled={disabled}
        onClick={() => {
          currentScreen === ScreenType.PIN_FORM
            ? setPin((prevPin) => prevPin + value)
            : setCurrentWithdrawal((prevVal) =>
                parseInt(prevVal.toString() + value, 10)
              );
        }}
      >
        {value}
      </button>
    </div>
  );
}

export default Key;
