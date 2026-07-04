import React, { useState, useEffect } from "react";

const Countdown = ({ seconds = 5, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(seconds);

  useEffect(() => {
    if (timeLeft <= 0) {
      onComplete?.();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onComplete]);

  return (
    <div className='text-center'>
      <div className='text-8xl font-bold text-white mb-4'>{timeLeft}</div>
      <div className='w-full bg-gray-700 rounded-full h-4'>
        <div
          className='bg-blue-600 h-4 rounded-full transition-all duration-1000'
          style={{ width: `${(timeLeft / seconds) * 100}%` }}
        />
      </div>
      <p className='text-gray-400 mt-4'>Make your choice!</p>
    </div>
  );
};

export default Countdown;
