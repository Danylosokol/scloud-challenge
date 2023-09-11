import React from "react";
import { usePin } from "@/app/context/PinProvider";
import { useATM } from "@/app/context/ATMProvider";

function PinForm() {
  const { pin, setPin } = usePin();
  const { setIsOn } = useATM();
  console.log("Current PIN");
  console.log(pin);

  return (
    <section className="flex flex-col justify-center items-center text-primary h-full text-center">
      <h1 className="text-2xl mb-3 font-bold">Enter your PIN:</h1>
      <p className="mb-3 mb:mb-5 text-center">
        Use the physical keyboard. Press the green button to
        submit.
      </p>
      <input
        type="password"
        className="py-2 px-1 border-primary border-2 rounded-md focus:border-secondary mb-5"
        autoFocus={true}
        value={pin}
        onChange={(event) => setPin(event.currentTarget.value)}
      />
      <button
        className="bg-secondary hover:bg-secondary-dark active:bg-secondary-light px-10 py-2 rounded-md"
        onClick={() => {
          setPin("");
          setIsOn(false);
        }}
      >
        Finish session
      </button>
    </section>
  );
}

export default PinForm;
