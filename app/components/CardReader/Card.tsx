import React from "react";
import { useATM } from "@/app/context/ATMProvider";


function Card() {
  const {isOn, setIsOn} = useATM();

  return (
    <div
      id="card"
      className={`h-20 w-36 bg-secondary rounded-b-md text-primary flex items-end pb-10 cursor-pointer duration-1000 ${
        isOn ? "-translate-y-20" : "-translate-y-0"
      }`}
      onClick={() => setIsOn((prev) => !prev)}
    >
      <span className="block -rotate-90">5412&nbsp;&nbsp;84</span>
      <span className="block -rotate-90">Michal</span>
    </div>
  );
}

export default Card;
