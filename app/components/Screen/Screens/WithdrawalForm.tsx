import React from 'react';
import { useScreen } from '@/app/context/ScreenProvider';
import { useCustomer } from '@/app/context/CustomerProvider';
import { ScreenType } from './ScreensConsts';
import { getNumerical } from '@/app/utils/processInput';

function WithdrawalForm() {
  const {setCurrentScreen} = useScreen();
  const {currentWithdrawal, setCurrentWithdrawal} = useCustomer();

  return (
    <section className="flex flex-col justify-center items-center text-primary h-full text-center">
      <h1 className="text-2xl mb-3 font-bold">Enter the withdrawal amount in £</h1>
      <p className="mb-5 text-center text-sm sm:text-base">
        Use the physical keyboard. Press the green button to confirm.
      </p>
      <input
        type="text"
        className="py-2 px-1 border-primary border-2 rounded-md focus:border-secondary mb-5"
        autoFocus={true}
        value={"£" + currentWithdrawal.toString()}
        onChange={(event) => {
          const value: number = getNumerical(event);
          setCurrentWithdrawal(value);
        }}
      />
      <button
        className="bg-secondary hover:bg-secondary-dark active:bg-secondary-light px-10 py-2 rounded-md"
        onClick={() => setCurrentScreen(ScreenType.MENU)}
      >
        Back
      </button>
    </section>
  );
}

export default WithdrawalForm