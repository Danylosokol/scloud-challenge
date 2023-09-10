"use client"
import React from 'react';
import Screen from './Screen/Screen';
import Keypad from './Keypad/Keypad';
import CardReader from './CardReader/CardReader';

function ATM() {

  return (
    <section className="bg-primary text-light w-[99vw] sm:w-[95vw] md:w-[75vw] lg:w-[55vw] p-2 sm:p-5 md:p-10 box-border rounded-t-md">
      <Screen />
      <CardReader />
      <Keypad />
    </section>
  );
}

export default ATM