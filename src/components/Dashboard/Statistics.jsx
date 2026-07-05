
const statItems = [
  { key: "wins", label: "Wins" },
  { key: "losses", label: "Losses" },
  { key: "ties", label: "Ties" },
  { key: "tournamentsWon", label: "Trophies" },
];

const Statistics = ({ stats = {} }) => {
  const wins = stats.wins || 0;
  const losses = stats.losses || 0;
  const ties = stats.ties || 0;
  const totalGames = wins + losses + ties;
  const winRate = totalGames ? Math.round((wins / totalGames) * 100) : 0;

  return (
    <section className='space-y-6'>
      <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
        {statItems.map((item) => (
          <div key={item.key} className='bg-gray-800 rounded-xl p-5'>
            <p className='text-gray-400 text-sm'>{item.label}</p>
            <p className='text-3xl font-bold text-white mt-2'>
              {stats[item.key] || 0}
            </p>
          </div>
        ))}
      </div>

      <div className='bg-gray-800 rounded-xl p-6'>
        <div className='flex items-center justify-between mb-3'>
          <h3 className='text-white font-semibold'>Win Rate</h3>
          <span className='text-blue-300 font-bold'>{winRate}%</span>
        </div>
        <div className='h-3 bg-gray-700 rounded-full overflow-hidden'>
          <div
            className='h-full bg-blue-500'
            style={{ width: `${winRate}%` }}
          />
        </div>
      </div>
    </section>
  );
};

export default Statistics;
