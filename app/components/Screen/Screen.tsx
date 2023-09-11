import React from 'react';
import ScreenDisplay from './ScreenDisplay';

function Screen() {
  return (
    <section className="flex justify-center h-80 mb-10">
      <div className="bg-light w-full p-5 h-full shadow-inner rounded-xl shadow-primary">
        <ScreenDisplay />
      </div>
    </section>
  );
}

export default Screen