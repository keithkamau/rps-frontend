
const statusStyles = {
  pending: "bg-gray-700 text-gray-300",
  active: "bg-blue-600 text-white",
  completed: "bg-green-600 text-white",
};

const getPlayerName = (player) => {
  if (!player) return "Waiting";
  if (typeof player === "string") return player;
  return player.username || player.name || "Player";
};

const PlayerRow = ({ player, winner }) => {
  const playerName = getPlayerName(player);
  const isWaiting = playerName === "Waiting";

  return (
    <div
      className={`flex items-center justify-between rounded-lg px-4 py-3 ${
        winner ? "bg-green-900/40 text-green-200" : "bg-gray-900 text-gray-200"
      }`}
    >
      <span className={isWaiting ? "text-gray-500" : "font-medium"}>
        {playerName}
      </span>
      {winner && <span className='text-sm font-semibold'>Winner</span>}
    </div>
  );
};

const Matchup = ({ match }) => {
  const status = match?.status || "pending";
  const winnerId = match?.winner?._id || match?.winner?.id || match?.winnerId;
  const player1Id = match?.player1?._id || match?.player1?.id;
  const player2Id = match?.player2?._id || match?.player2?.id;

  return (
    <article className='bg-gray-800 border border-gray-700 rounded-xl p-4 space-y-3'>
      <div className='flex items-center justify-between gap-3'>
        <h3 className='text-white font-semibold'>
          {match?.name || `Match ${match?.matchNumber || match?.id || ""}`}
        </h3>
        <span
          className={`text-xs uppercase tracking-wide px-2 py-1 rounded-full ${
            statusStyles[status] || statusStyles.pending
          }`}
        >
          {status}
        </span>
      </div>

      <div className='space-y-2'>
        <PlayerRow
          player={match?.player1}
          winner={winnerId && winnerId === player1Id}
        />
        <PlayerRow
          player={match?.player2}
          winner={winnerId && winnerId === player2Id}
        />
      </div>
    </article>
  );
};

export default Matchup;
