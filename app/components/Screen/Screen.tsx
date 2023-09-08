import React from 'react';
import ScreenButton from './ScreenButton';
import ScreenDisplay from './ScreenDisplay';

function Screen() {
  return (
    <section className="flex justify-center mb-10">
      {/* <nav className="flex flex-col justify-end gap-3">
        <ScreenButton />
        <ScreenButton />
        <ScreenButton />
        <ScreenButton />
      </nav> */}
      <ScreenDisplay/>
      {/* <nav className="flex flex-col justify-end gap-3">
        <ScreenButton />
        <ScreenButton />
        <ScreenButton />
        <ScreenButton />
      </nav> */}
    </section>
  );
}

export default Screen