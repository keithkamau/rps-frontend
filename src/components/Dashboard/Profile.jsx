import { useAuth } from "../../hooks/useAuth";
import Statistics from "./Statistics";

const Profile = () => {
  const { user } = useAuth();
  const stats = user?.stats || {
    wins: user?.wins || 0,
    losses: user?.losses || 0,
    ties: user?.ties || 0,
    tournamentsWon: user?.tournamentsWon || 0,
  };

  return (
    <main className='min-h-screen bg-gray-900 py-8'>
      <div className='max-w-5xl mx-auto px-4 space-y-8'>
        <section className='bg-gray-800 rounded-xl p-6'>
          <div className='flex flex-col sm:flex-row sm:items-center gap-5'>
            <div className='h-20 w-20 rounded-full bg-blue-600 flex items-center justify-center text-white text-3xl font-bold'>
              {(user?.username || "U").slice(0, 1).toUpperCase()}
            </div>
            <div>
              <h1 className='text-3xl font-bold text-white'>
                {user?.username || "Player"}
              </h1>
              <p className='text-gray-400'>{user?.email || "Ready to play"}</p>
            </div>
          </div>
        </section>

        <Statistics stats={stats} />
      </div>
    </main>
  );
};

export default Profile;
