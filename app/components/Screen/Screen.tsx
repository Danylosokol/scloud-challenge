import React from 'react';
import ScreenButton from './ScreenButton';
import ScreenDisplay from './ScreenDisplay';

function Screen() {
  return (
    <section className="flex justify-center mb-10">
      <div className="bg-light w-full px-5 rounded-md h-72 mx-2 md:mx-5">
        <ScreenDisplay />
      </div>
    </section>
  );
}

export default Screen