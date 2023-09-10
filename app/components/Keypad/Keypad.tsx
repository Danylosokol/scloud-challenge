import React from "react";
import Key from "./Key";
import { keysInfo } from "./KeypadConsts";
import { useATM } from "@/app/context/ATMProvider";
import { usePin } from "@/app/context/PinProvider";
import { useMessage } from "@/app/context/MessageProvider";
import { useCustomer } from "@/app/context/CustomerProvider";
import { useScreen } from "@/app/context/ScreenProvider";
import { ScreenType } from "../Screen/Screens/ScreensConsts";
import axios from "axios";

function Keypad() {
  const {currentNotes} = useATM();
  const { pin, setPin, setIsPinValid } = usePin();
  const { currentScreen } = useScreen();
  const { currentWithdrawal, setCurrentWithdrawal } = useCustomer();
  const { setMessage } = useMessage();
  const { setCurrentBalance } = useCustomer();

  const verifyPin = async () => {
    await axios
      .post("https://frontend-challenge.screencloud-michael.now.sh/api/pin/", {
        pin: pin,
      })
      .then((response) => {
        console.log("Pin check response:");
        console.log(response);
        setPin("");
        setIsPinValid(true);
        setCurrentBalance(response.data.currentBalance);
      })
      .catch((error) => {
        console.log(error);
        setMessage("Entered PIN is incorrect!");
        setPin("");
      });
  };

  const confirmWithdrawal = () => {
    
  }

  const handleDelete = () => {
    if (currentScreen === ScreenType.PIN_FORM) {
      setPin((prevPin) => prevPin.substring(0, prevPin.length - 1));
    } else {
      setCurrentWithdrawal((prevValue) =>
        prevValue > 9
          ? parseInt(
              prevValue.toString().substring(0, prevValue.toString().length - 1)
            )
          : 0
      );
    }
  };

  const handleSubmit = () => {
    if (currentScreen === ScreenType.PIN_FORM) {
      verifyPin()
    }else{
      confirmWithdrawal();
    }
  }

  return (
    <section className="flex justify-center">
      <div className="grid grid-cols-3 bg-primary-dark text-primary gap-x-5 gap-y-3 rounded-md p-5 z-10">
        {keysInfo.map((key, indx) => (
          <Key
            value={key.value}
            key={indx}
            disabled={
              currentScreen !== ScreenType.PIN_FORM &&
              currentScreen !== ScreenType.WITHDRAWAL_FORM
            }
          />
        ))}
        <button
          className="bg-wrong hover:bg-wrong-dark active:bg-wrong-light text-primary text-xs h-14 w-14 rounded-md disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-wrong"
          disabled={!pin.length && currentWithdrawal <= 0}
          onClick={() => handleDelete()}
        ></button>
        <button
          className="bg-right hover:bg-right-dark active:bg-right-light text-primary text-xs h-14 w-14 rounded-md disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-right"
          disabled={!pin.length && currentWithdrawal <= 0}
          onClick={() => handleSubmit()}
        ></button>
      </div>
    </section>
  );
}

export default Keypad;
