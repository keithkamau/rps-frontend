import React, { useState, useEffect } from "react";
import { GAME_TIPS, EMOJIS } from "../../utils/constants";

const GameTips = () => {
  const [tipIndex, setTipIndex] = useState(0);
  const [emojiIndex, setEmojiIndex] = useState(0);

  useEffect(() => {
    const tipTimer = setInterval(() => {
      setTipIndex((prev) => (prev + 1) % GAME_TIPS.length);
    }, 3000);

    const emojiTimer = setInterval(() => {
      setEmojiIndex((prev) => (prev + 1) % 3);
    }, 1000);

    return () => {
      clearInterval(tipTimer);
      clearInterval(emojiTimer);
    };
  }, []);

  const emojis = Object.values(EMOJIS);

  return (
    <div className='bg-gray-800 rounded-xl p-8 text-center'>
      <div className='text-6xl mb-6 animate-bounce'>{emojis[emojiIndex]}</div>
      <h3 className='text-xl text-white font-semibold mb-4'>Game Tips</h3>
      <p className='text-gray-300 text-lg'>{GAME_TIPS[tipIndex]}</p>
    </div>
  );
};

export default GameTips;
