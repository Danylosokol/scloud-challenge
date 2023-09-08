import React from 'react';
import { usePin } from '@/app/context/PinProvider';
import { useIsOn } from '@/app/context/IsOnProvider';


function PinForm() {
  const {pin, setPin} = usePin();
  const {setIsOn}  = useIsOn();

  return (
    <section className="flex flex-col justify-center items-center text-primary h-full">
      <h1 className="text-2xl mb-3">Pleas enter your PIN:</h1>
      <input
        type="text"
        className="py-2 px-1 border-primary border-2 rounded-md focus:border-secondary mb-5"
        autoFocus={true}
        value={pin.split("").map(() => ("*")).join("")}
        onChange={(event) => setPin(event.target.value)}
      />
      <button className="bg-secondary hover:bg-secondary-dark active:bg-secondary-light px-4 py-2 rounded-md" onClick={() => setIsOn(false)}>
        Finish session
      </button>
    </section>
  );
}

export default PinForm