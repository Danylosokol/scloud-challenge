import React from "react";
import Key from "./Key";
import { keysInfo } from "./KeypadConsts";
import { useIsOn } from "@/app/context/IsOnProvider";
import { usePin } from "@/app/context/PinProvider";
import { useMessage } from "@/app/context/MessageProvider";
import axios from "axios";

function Keypad() {
  const {isOn} = useIsOn();
  const { pin, setPin, isPinValid, setIsPinValid } = usePin();
  const {setMessage} = useMessage();

  const verifyPin = async () => {
    await axios
      .post("https://frontend-challenge.screencloud-michael.now.sh/api/pin/", {
        pin: pin,
      })
      .then((response) => {
        console.log("Pin check response:");
        console.log(response);
        setIsPinValid(true);
      })
      .catch((error) => {
        console.log(error);
        setMessage("Entered PIN is incorrect!");
        setPin("");
      });
  };

  return (
    <section className="flex justify-center">
      <div className="grid grid-cols-3 bg-primary-dark text-primary gap-x-5 gap-y-3 rounded-md p-5">
        {keysInfo.map((key, indx) => (
          <Key value={key.value} key={indx} disabled={!isOn && !isPinValid} />
        ))}
        <button
          className="bg-wrong hover:bg-wrong-dark active:bg-wrong-light text-primary text-xs h-14 w-14 rounded-md disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-wrong"
          disabled={!pin.length}
          onClick={() =>
            setPin((prevPin) => prevPin.substring(0, prevPin.length - 1))
          }
        ></button>
        <button
          className="bg-right hover:bg-right-dark active:bg-right-light text-primary text-xs h-14 w-14 rounded-md disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-right"
          disabled={!pin.length}
          onClick={() => verifyPin()}
        ></button>
      </div>
    </section>
  );
}

export default Keypad;
