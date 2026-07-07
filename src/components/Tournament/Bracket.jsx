import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { tournamentAPI } from "../../services/api";
import Matchup from "./Matchup";

const Bracket = ({ tournamentId }) => {
  const [bracket, setBracket] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!tournamentId) return;

    const loadBracket = async () => {
      setLoading(true);
      try {
        const res = await tournamentAPI.getBracket(tournamentId);
        setBracket(res.data);
      } catch {
        toast.error("Could not load bracket");
        setBracket(null);
      } finally {
        setLoading(false);
      }
    };

    loadBracket();
  }, [tournamentId]);

  const rounds = useMemo(() => {
    if (!bracket?.rounds) return [];
    return Object.entries(bracket.rounds).map(([name, matches]) => ({
      name: name.replace("_", " ").toUpperCase(),
      matches
    }));
  }, [bracket]);

  if (!tournamentId) {
    return (
      <div className='text-gray-300 bg-gray-800 rounded-xl p-6 text-center'>
        Select a tournament to view its bracket
      </div>
    );
  }

  return (
    <section className='bg-gray-900 py-8'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='mb-6'>
          <h2 className='text-3xl font-bold text-white'>Tournament Bracket</h2>
          <p className='text-gray-400 mt-2'>
            Track each round from opening matchups to the final.
          </p>
        </div>

        {loading ? (
          <div className='text-gray-300 bg-gray-800 rounded-xl p-6'>
            Loading bracket...
          </div>
        ) : rounds.length === 0 ? (
          <div className='text-gray-300 bg-gray-800 rounded-xl p-6 text-center'>
            <p>No matches yet</p>
            <p className='text-sm text-gray-500 mt-1'>Waiting for players to join</p>
          </div>
        ) : (
          <div className='grid gap-6 lg:grid-cols-3'>
            {rounds.map((round, index) => (
              <div key={index} className='space-y-4'>
                <h3 className='text-lg font-semibold text-blue-300'>
                  {round.name}
                </h3>
                {(round.matches || []).map((match) => (
                  <Matchup
                    key={match.id}
                    match={match}
                  />
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Bracket;
