import React from "react";
import Cash from "./Cash";
import { useATM } from "@/app/context/ATMProvider";

function Dispenser() {
  const { giveCash } = useATM();

  return (
    <section className="flex justify-center mb-5 relative">
      <div className="bg-primary border-right-dark border-2 rounded-b-md h-7 w-40"></div>
      <div
        className={`absolute mt-1 outline-none overflow-hidden duration-1000 drop-shadow-2xl hover:drop-shadow-none ${
          giveCash ? "z-20" : "z-0"
        }`}
      >
        <Cash />
      </div>
    </section>
  );
}

export default Dispenser;
