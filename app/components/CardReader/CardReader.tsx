import React from "react";
import Card from "./Card";
import { useATM } from "@/app/context/ATMProvider";

function CardReader() {
  const { isOn, setIsOn } = useATM();
  
  return (
    <section className="flex justify-center mb-5 relative">
      <div className="bg-right-dark h-3 w-40"></div>
      <div className={`absolute mt-1 outline-none overflow-hidden duration-1000 drop-shadow-2xl hover:drop-shadow-none ${isOn ? "z-0" : "z-20"}`}>
        <Card />
      </div>
    </section>
  );
}

export default CardReader;
