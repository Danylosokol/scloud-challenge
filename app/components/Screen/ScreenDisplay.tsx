"use client";
import React, {useEffect} from "react";
import Greeting from "./Screens/Greeting";
import Message from "./Screens/Message";
import PinForm from "./Screens/PinForm";
import Loading from "./Screens/Loading";
import Menu from "./Screens/Menu";
import WithdrawalForm from "./Screens/WithdrawalForm";
import OverdraftAlert from "./Screens/OverdraftAlert";
import WithdrawalConfirmation from "./Screens/WithdrawalConfirmation";
import WithdrawalResult from "./Screens/WithdrawalResult";
import { ScreenType } from "./Screens/ScreensConsts";
import { useATM } from "@/app/context/ATMProvider";
import { useMessage } from "@/app/context/MessageProvider";
import { usePin } from "@/app/context/PinProvider";
import { useScreen } from "@/app/context/ScreenProvider";
import { useCustomer } from "@/app/context/CustomerProvider";

function ScreenDisplay() {
  const { isOn, isLoading } = useATM();
  const { message, setMessage } = useMessage();
  const { isPinValid } = usePin();
  const {currentScreen, setCurrentScreen} = useScreen();
  const {currentWithdrawal} = useCustomer();

  useEffect(() => {
    if (isOn) {
      if (message) {
        setCurrentScreen(ScreenType.MESSAGE);
      } else if(isLoading){
        setCurrentScreen(ScreenType.LOADING);
      }else if (!isPinValid) {
        setCurrentScreen(ScreenType.PIN_FORM);
      } else if (isPinValid && currentWithdrawal){
        setCurrentScreen(ScreenType.WITHDRAWAL_FORM);
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
    case ScreenType.LOADING:
      return <Loading />;
    case ScreenType.MENU:
      return <Menu />;
    case ScreenType.MESSAGE:
      return <Message message={message} onClick={() => setMessage("")} />;
    case ScreenType.WITHDRAWAL_FORM:
      return <WithdrawalForm />;
    case ScreenType.OVERDRAFT_ALERT:
      return <OverdraftAlert />;
    case ScreenType.WITHDRAWAL_CONFIRMATION:
      return <WithdrawalConfirmation />;
    case ScreenType.WITHDRAWAL_RESULT:
      return <WithdrawalResult />;
    default:
      return "Somthing went wrong...";
  }
}

export default ScreenDisplay;
