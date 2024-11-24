import React from 'react'

const Loader = ({ message = "Loading" }: { message?: string }) => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
      <h2 className="ml-4 text-xl font-semibold">{message}...</h2>
    </div>
  )
};

export default Loader;
