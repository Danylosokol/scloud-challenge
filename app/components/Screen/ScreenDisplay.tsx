import React from "react";
import Greeting from "./Interfaces/Greeting";
import Message from "./Interfaces/Message";
import PinForm from "./Interfaces/PinForm";
import Menu from "./Interfaces/Menu";
import { useIsOn } from "@/app/context/IsOnProvider";
import { useMessage } from "@/app/context/MessageProvider";
import { usePin } from "@/app/context/PinProvider";

function ScreenDisplay() {
  const { isOn } = useIsOn();
  const { message, setMessage } = useMessage();
  const { isPinValid } = usePin();
  return (
    <div className="bg-light w-[75%] rounded-md h-72 mx-2 md:mx-5">
      {isOn && message ? (
        <Message message={message} onClick={() => setMessage("")} />
      ) : isOn && !isPinValid ? (
        <PinForm />
      ) : isOn && isPinValid ? (
        <Menu />
      ) : (
        <Greeting />
      )}
    </div>
  );
}

export default ScreenDisplay;
