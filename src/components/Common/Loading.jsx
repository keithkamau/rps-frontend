import { useState, useEffect } from "react";

const Loading = () => {
  const [index, setIndex] = useState(0);
  const emojis = ["🪨", "📄", "✂️"];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % 3);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='flex flex-col items-center justify-center py-20'>
      <div className='text-8xl animate-bounce'>{emojis[index]}</div>
      <p className='mt-4 text-gray-400'>Loading...</p>
    </div>
  );
};

export default Loading;
