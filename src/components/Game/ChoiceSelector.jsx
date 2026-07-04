import React from "react";
import { CHOICES, EMOJIS } from "../../utils/constants";

const ChoiceSelector = ({ onSelect, disabled = false, selectedChoice }) => {
  return (
    <div className='grid grid-cols-3 gap-4'>
      {CHOICES.map((choice) => (
        <button
          key={choice}
          onClick={() => onSelect(choice)}
          disabled={disabled}
          className={`
            p-6 rounded-xl text-center transition-all
            ${
              selectedChoice === choice
                ? "bg-blue-600 scale-105 ring-2 ring-blue-400"
                : "bg-gray-800 hover:bg-gray-700"
            }
            ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:scale-105"}
          `}
        >
          <div className='text-6xl mb-2'>{EMOJIS[choice]}</div>
          <div className='text-white capitalize font-semibold'>{choice}</div>
        </button>
      ))}
    </div>
  );
};

export default ChoiceSelector;
