import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { tournamentAPI } from "../../services/api";
import Matchup from "./Matchup";

const demoRounds = [
  {
    name: "Semifinals",
    matches: [
      {
        id: "sf-1",
        matchNumber: 1,
        status: "active",
        player1: { id: "p1", username: "You" },
        player2: { id: "p2", username: "Rival" },
      },
      {
        id: "sf-2",
        matchNumber: 2,
        status: "pending",
        player1: { id: "p3", username: "Alex" },
        player2: null,
      },
    ],
  },
  {
    name: "Final",
    matches: [
      {
        id: "final",
        matchNumber: 3,
        status: "pending",
        player1: null,
        player2: null,
      },
    ],
  },
];

const normalizeRounds = (bracket) => {
  const source = bracket?.rounds || bracket?.matches || bracket || [];
  if (!Array.isArray(source)) return [];

  if (source[0]?.matches) return source;

  return source.reduce((rounds, match) => {
    const roundName = match.roundName || `Round ${match.round || 1}`;
    const round = rounds.find((item) => item.name === roundName);
    if (round) {
      round.matches.push(match);
      return rounds;
    }
    return [...rounds, { name: roundName, matches: [match] }];
  }, []);
};

const Bracket = ({ tournamentId }) => {
  const [bracket, setBracket] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!tournamentId) return;

    const loadBracket = async () => {
      setLoading(true);
      try {
        const res = await tournamentAPI.getBracket(tournamentId);
        setBracket(res.data.bracket || res.data);
      } catch {
        toast.error("Could not load bracket");
      } finally {
        setLoading(false);
      }
    };

    loadBracket();
  }, [tournamentId]);

  const rounds = useMemo(() => {
    const normalized = normalizeRounds(bracket);
    return normalized.length ? normalized : demoRounds;
  }, [bracket]);

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
        ) : (
          <div className='grid gap-6 lg:grid-cols-3'>
            {rounds.map((round, index) => (
              <div key={round.id || round.name || index} className='space-y-4'>
                <h3 className='text-lg font-semibold text-blue-300'>
                  {round.name || `Round ${index + 1}`}
                </h3>
                {(round.matches || []).map((match, matchIndex) => (
                  <Matchup
                    key={match.id || match._id || matchIndex}
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
