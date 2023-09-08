import React from 'react'

function Message({message, onClick} : {message: string, onClick: Function}) {
  return (
    <section className="flex flex-col justify-center items-center text-primary h-full">
      <h1 className="text-2xl mb-3">{message}</h1>
      <button
        className="bg-secondary hover:bg-secondary-dark active:bg-secondary-light px-4 py-2 rounded-md"
        onClick={() => onClick()}
      >
        OK
      </button>
    </section>
  );
}

export default Message