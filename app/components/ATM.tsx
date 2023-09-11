"use client";
import React from "react";
import Screen from "./Screen/Screen";
import Keypad from "./Keypad/Keypad";
import CardReader from "./CardReader/CardReader";

function ATM() {
  return (
    <section className="text-light w-[99vw] sm:w-[95vw] md:w-[75vw] lg:w-[55vw] max-w-[45rem] max-h-[80rem] px-5 md:px-10 pt-5 md:pt-7 box-border rounded-2xl shadow-2xl shadow-[#24272e] bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-gray-600 via-gray-900 to-primary">
      <header className="mb-5">
        <img src="./scloud-logo.png" className="w-12 h-auto" alt="ScreenCloud logo" />
      </header>
      <Screen />
      <CardReader />
      <Keypad />
    </section>
  );
}

export default ATM;
