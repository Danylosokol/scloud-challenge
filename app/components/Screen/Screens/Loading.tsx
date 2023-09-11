import React from 'react'

function Loading() {
  return (
    <section className="flex flex-col justify-center items-center text-primary h-full">
      <h1 className="text-2xl mb-3 text-center font-bold">
        Loading...
      </h1>
     <img src="./loading.gif" alt="Loading animation..." className='w-20 h-auto'/>
    </section>
  );
}

export default Loading