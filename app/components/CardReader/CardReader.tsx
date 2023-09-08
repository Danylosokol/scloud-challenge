import React from "react";
import Card from "./Card";

function CardReader() {
  return (
    <section className="flex justify-center mb-5 relative">
      <div className="bg-right-dark h-3 w-40"></div>
      <div className="absolute mt-1 outline-none overflow-hidden">
        <Card />
      </div>
    </section>
  );
}

export default CardReader;
