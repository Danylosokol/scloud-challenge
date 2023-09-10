"use client";
import React, {useEffect} from "react";
import Greeting from "./Screens/Greeting";
import Message from "./Screens/Message";
import PinForm from "./Screens/PinForm";
import Menu from "./Screens/Menu";
import WithdrawalForm from "./Screens/WithdrawalForm";
import { ScreenType } from "./Screens/ScreensConsts";
import { useATM } from "@/app/context/ATMProvider";
import { useMessage } from "@/app/context/MessageProvider";
import { usePin } from "@/app/context/PinProvider";
import { useScreen } from "@/app/context/ScreenProvider";

function ScreenDisplay() {
  const { isOn } = useATM();
  const { message, setMessage } = useMessage();
  const { isPinValid } = usePin();
  const {currentScreen, setCurrentScreen} = useScreen();

  useEffect(() => {
    if (isOn) {
      if (message) {
        setCurrentScreen(ScreenType.MESSAGE);
      } else if (!isPinValid) {
        setCurrentScreen(ScreenType.PIN_FORM);
      } else if (isPinValid) {
        setCurrentScreen(ScreenType.MENU);
      }
    } else {
      setCurrentScreen(ScreenType.GREETING);
    }
  }, [isOn, message, isPinValid, setCurrentScreen]);

  switch (currentScreen) {
    case ScreenType.GREETING:
      return <Greeting />;
    case ScreenType.PIN_FORM:
      return <PinForm />;
    case ScreenType.MENU:
      return <Menu />;
    case ScreenType.MESSAGE:
      return <Message message={message} onClick={() => setMessage("")} />;
    case ScreenType.WITHDRAWAL_FORM:
      return <WithdrawalForm/>
    default:
      return "Somthing went wrong...";
  }
}

export default ScreenDisplay;
