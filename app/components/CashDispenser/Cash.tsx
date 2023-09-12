import React from "react";
import { useATM } from "@/app/context/ATMProvider";

function Cash() {
  const { giveCash, setGiveCash } = useATM();

  return (
    <div
      className={`h-20 w-36 bg-right-dark rounded-b-md text-primary flex items-end justify-center pb-10 cursor-pointer ${
        giveCash ? "-translate-y-0 duration-1000" : "-translate-y-20"
      }`}
      onClick={() => setGiveCash((prev) => !prev)}
    >
      <span className="block -rotate-90 text-4xl font-extrabold pr-7">£</span>
    </div>
  );
}

export default Cash;
