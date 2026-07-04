import React from "react";

const GameBoard = ({ children }) => {
  return (
    <div className='min-h-screen bg-gray-900 py-8'>
      <div className='max-w-4xl mx-auto px-4'>
        <h1 className='text-4xl font-bold text-white text-center mb-8'>
          Rock Paper Scissors
        </h1>
        {children}
      </div>
    </div>
  );
};

export default GameBoard;
