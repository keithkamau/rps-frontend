cat > (src / components / Tournament / Lobby.jsx) << "EOF";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { tournamentAPI } from "../../services/api";
import { MIN_PLAYERS } from "../../utils/constants";

const Lobby = ({ onSelectTournament }) => {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [joiningId, setJoiningId] = useState(null);

  useEffect(() => {
    tournamentAPI
      .getActiveTournaments()
      .then((res) => {
        const items = res.data.tournaments || res.data || [];
        if (Array.isArray(items) && items.length) {
          setTournaments(items);
        } else {
          toast("No tournaments available. Create one!");
        }
      })
      .catch(() => {
        toast.error("Could not load tournaments");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleJoin = async (tournament) => {
    setJoiningId(tournament.id);

    try {
      await tournamentAPI.joinTournament(tournament.id);
      toast.success(`Joined ${tournament.name || "tournament"}`);
      onSelectTournament?.(tournament.id);
    } catch (err) {
      toast.error(err.response?.data?.error || "Could not join tournament");
    } finally {
      setJoiningId(null);
    }
  };

  return (
    <section className='bg-gray-900 py-8'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='mb-6'>
          <h1 className='text-4xl font-bold text-white'>Tournament Lobby</h1>
          <p className='text-gray-400 mt-2'>
            Join an open bracket and play when enough players are ready.
          </p>
        </div>

        {loading ? (
          <div className='text-gray-300 bg-gray-800 rounded-xl p-6'>
            Loading tournaments...
          </div>
        ) : tournaments.length === 0 ? (
          <div className='text-gray-300 bg-gray-800 rounded-xl p-6 text-center'>
            <p className='text-lg mb-2'>No active tournaments</p>
            <p className='text-sm text-gray-500'>
              Create one from the tournament page or ask an admin
            </p>
          </div>
        ) : (
          <div className='grid gap-4 md:grid-cols-2'>
            {tournaments.map((tournament) => {
              const playerCount = tournament.player_count || 0;

              return (
                <article
                  key={tournament.id}
                  className='bg-gray-800 border border-gray-700 rounded-xl p-6'
                >
                  <div className='flex items-start justify-between gap-4'>
                    <div>
                      <h2 className='text-xl font-bold text-white'>
                        {tournament.name || "Open Tournament"}
                      </h2>
                      <p className='text-gray-400 capitalize mt-1'>
                        {tournament.status || "open"}
                      </p>
                    </div>
                    <span className='bg-blue-600 text-white text-sm px-3 py-1 rounded-full'>
                      {playerCount}/{MIN_PLAYERS}+
                    </span>
                  </div>

                  <button
                    onClick={() => handleJoin(tournament)}
                    disabled={
                      joiningId === tournament.id ||
                      tournament.status === "active"
                    }
                    className='mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg disabled:opacity-60'
                  >
                    {joiningId === tournament.id
                      ? "Joining..."
                      : tournament.status === "active"
                        ? "In Progress"
                        : "Join Tournament"}
                  </button>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Lobby;
EOF;
