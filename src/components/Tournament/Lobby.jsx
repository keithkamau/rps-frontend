import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { tournamentAPI } from "../../services/api";
import { MIN_PLAYERS } from "../../utils/constants";

const Lobby = ({ onSelectTournament }) => {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [joiningId, setJoiningId] = useState(null);
  const [creating, setCreating] = useState(false);
  const [tournamentName, setTournamentName] = useState("");

  const loadTournaments = () => {
    setLoading(true);
    tournamentAPI
      .getActiveTournaments()
      .then((res) => {
        const items = res.data.tournaments || res.data || [];
        setTournaments(Array.isArray(items) ? items : []);
      })
      .catch(() => {
        toast.error("Could not load tournaments");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadTournaments();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    const name = tournamentName.trim();
    if (!name) return toast.error("Enter a tournament name");

    setCreating(true);
    try {
      const res = await tournamentAPI.createTournament(name);
      toast.success("Tournament created!");
      setTournamentName("");
      loadTournaments();
      onSelectTournament?.(res.data.tournament.id);
    } catch (err) {
      toast.error(err.response?.data?.error || "Could not create tournament");
    } finally {
      setCreating(false);
    }
  };

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
        <div className='mb-6 flex items-center justify-between flex-wrap gap-4'>
          <div>
            <h1 className='text-4xl font-bold text-white'>Tournament Lobby</h1>
            <p className='text-gray-400 mt-2'>
              Create or join a tournament. Games start when 4+ players join.
            </p>
          </div>

          <form onSubmit={handleCreate} className='flex gap-2'>
            <input
              type='text'
              value={tournamentName}
              onChange={(e) => setTournamentName(e.target.value)}
              placeholder='Tournament name...'
              className='px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500'
            />
            <button
              type='submit'
              disabled={creating}
              className='bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold disabled:opacity-60 whitespace-nowrap'
            >
              {creating ? "Creating..." : "Create Tournament"}
            </button>
          </form>
        </div>

        {loading ? (
          <div className='text-gray-300 bg-gray-800 rounded-xl p-6'>
            Loading tournaments...
          </div>
        ) : tournaments.length === 0 ? (
          <div className='text-gray-300 bg-gray-800 rounded-xl p-6 text-center'>
            <p className='text-lg mb-2'>No active tournaments</p>
            <p className='text-sm text-gray-500'>Create one above to get started!</p>
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
                        {tournament.name}
                      </h2>
                      <p className='text-gray-400 capitalize mt-1'>
                        {tournament.status}
                      </p>
                    </div>
                    <span className='bg-blue-600 text-white text-sm px-3 py-1 rounded-full'>
                      {playerCount}/{MIN_PLAYERS}+
                    </span>
                  </div>

                  <div className='mt-5 h-2 bg-gray-700 rounded-full overflow-hidden'>
                    <div
                      className='h-full bg-blue-500 transition-all'
                      style={{
                        width: `${Math.min((playerCount / MIN_PLAYERS) * 100, 100)}%`,
                      }}
                    />
                  </div>

                  <button
                    onClick={() => handleJoin(tournament)}
                    disabled={joiningId === tournament.id || tournament.status === 'active' || tournament.status === 'completed'}
                    className='mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg disabled:opacity-60'
                  >
                    {joiningId === tournament.id
                      ? "Joining..."
                      : tournament.status === 'active'
                        ? "In Progress"
                        : tournament.status === 'completed'
                          ? "Finished"
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
