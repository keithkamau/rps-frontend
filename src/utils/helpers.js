export const getWinnerText = (result, player1, player2) => {
  if (result === "player1") return `${player1} wins!`;
  if (result === "player2") return `${player2} wins!`;
  if (result === "tie") return "It's a tie!";
  return "";
};

export const getRandomTip = () => {
  const tips = [
    "Rock crushes scissors! 🪨",
    "Paper covers rock! 📄",
    "Scissors cuts paper! ✂️",
    "Watch your opponent's patterns! 👀",
    "Stay unpredictable! 🎯",
  ];
  return tips[Math.floor(Math.random() * tips.length)];
};
