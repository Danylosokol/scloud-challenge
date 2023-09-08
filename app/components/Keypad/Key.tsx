import React from 'react';
import {usePin} from "@/app/context/PinProvider";

function Key({value, disabled}: {value: string, disabled: boolean}) {
  const {setPin} = usePin();
  return (
    <div>
      <button
        className="bg-primary-lighter hover:bg-primary-light active:bg-light text-primary h-14 w-14 rounded-md disabled:cursor-not-allowed disabled:hover:bg-primary-lighter"
        disabled={disabled}
        onClick={() => setPin((prevPin) => prevPin + value)}
      >
        {value}
      </button>
    </div>
  );
}

export default Key