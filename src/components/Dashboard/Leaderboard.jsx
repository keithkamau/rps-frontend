import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { authAPI } from "../../services/api";

const Leaderboard = () => {
  const { user } = useAuth();
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const api = require("../../services/api");
    api.default.get("/api/admin/leaderboard")
      .then((res) => {
        setPlayers(res.data.leaderboard || []);
      })
      .catch(() => {
        setPlayers([]);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className='min-h-screen bg-gray-900 py-8'>
      <div className='max-w-5xl mx-auto px-4'>
        <div className='mb-6'>
          <h1 className='text-4xl font-bold text-white'>Leaderboard</h1>
          <p className='text-gray-400 mt-2'>
            Top players ranked by wins and tournament record.
          </p>
        </div>

        {loading ? (
          <div className='text-gray-300 bg-gray-800 rounded-xl p-6'>
            Loading leaderboard...
          </div>
        ) : players.length === 0 ? (
          <div className='text-gray-300 bg-gray-800 rounded-xl p-6 text-center'>
            <p>No players yet</p>
            <p className='text-sm text-gray-500 mt-1'>Play matches to appear on the leaderboard</p>
          </div>
        ) : (
          <div className='bg-gray-800 rounded-xl overflow-hidden'>
            <div className='grid grid-cols-12 gap-3 px-4 py-3 bg-gray-700 text-gray-300 text-sm font-semibold'>
              <span className='col-span-2'>Rank</span>
              <span className='col-span-4'>Player</span>
              <span className='col-span-2 text-right'>Wins</span>
              <span className='col-span-2 text-right'>Win Rate</span>
              <span className='col-span-2 text-right'>Streak</span>
            </div>

            {players.map((player) => {
              const isCurrentUser = player.username === user?.username;

              return (
                <div
                  key={player.username}
                  className={`grid grid-cols-12 gap-3 px-4 py-4 border-t border-gray-700 ${
                    isCurrentUser ? "bg-blue-900/30" : ""
                  }`}
                >
                  <span className='col-span-2 text-gray-300'>#{player.rank}</span>
                  <span className='col-span-4 text-white font-medium truncate'>
                    {player.username}
                  </span>
                  <span className='col-span-2 text-right text-gray-300'>
                    {player.games_won}
                  </span>
                  <span className='col-span-2 text-right text-gray-300'>
                    {player.win_rate}%
                  </span>
                  <span className='col-span-2 text-right text-blue-300 font-semibold'>
                    {player.best_streak}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
};

export default Leaderboard;
