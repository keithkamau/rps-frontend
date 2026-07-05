import { useAuth } from "../../hooks/useAuth";

const fallbackPlayers = [
  { username: "Champion", wins: 18, losses: 4, tournamentsWon: 3 },
  { username: "PaperTrail", wins: 15, losses: 5, tournamentsWon: 2 },
  { username: "RockSolid", wins: 12, losses: 6, tournamentsWon: 1 },
  { username: "SharpScissors", wins: 9, losses: 7, tournamentsWon: 1 },
];

const Leaderboard = ({ players = fallbackPlayers }) => {
  const { user } = useAuth();
  const entries = [...players].sort((a, b) => {
    const trophyDiff = (b.tournamentsWon || 0) - (a.tournamentsWon || 0);
    return trophyDiff || (b.wins || 0) - (a.wins || 0);
  });

  return (
    <main className='min-h-screen bg-gray-900 py-8'>
      <div className='max-w-5xl mx-auto px-4'>
        <div className='mb-6'>
          <h1 className='text-4xl font-bold text-white'>Leaderboard</h1>
          <p className='text-gray-400 mt-2'>
            Top players ranked by tournament wins and match record.
          </p>
        </div>

        <div className='bg-gray-800 rounded-xl overflow-hidden'>
          <div className='grid grid-cols-12 gap-3 px-4 py-3 bg-gray-700 text-gray-300 text-sm font-semibold'>
            <span className='col-span-2'>Rank</span>
            <span className='col-span-4'>Player</span>
            <span className='col-span-2 text-right'>Wins</span>
            <span className='col-span-2 text-right'>Losses</span>
            <span className='col-span-2 text-right'>Trophies</span>
          </div>

          {entries.map((player, index) => {
            const isCurrentUser = player.username === user?.username;

            return (
              <div
                key={player.id || player._id || player.username}
                className={`grid grid-cols-12 gap-3 px-4 py-4 border-t border-gray-700 ${
                  isCurrentUser ? "bg-blue-900/30" : ""
                }`}
              >
                <span className='col-span-2 text-gray-300'>#{index + 1}</span>
                <span className='col-span-4 text-white font-medium truncate'>
                  {player.username}
                </span>
                <span className='col-span-2 text-right text-gray-300'>
                  {player.wins || 0}
                </span>
                <span className='col-span-2 text-right text-gray-300'>
                  {player.losses || 0}
                </span>
                <span className='col-span-2 text-right text-blue-300 font-semibold'>
                  {player.tournamentsWon || 0}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default Leaderboard;
