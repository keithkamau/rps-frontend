import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim() || !password) return;

    setLoading(true);
    const success = await login(username, password);
    setLoading(false);

    if (success) navigate("/tournament");
  };

  return (
    <div className='min-h-screen bg-gray-900 flex items-center justify-center px-4'>
      <div className='bg-gray-800 rounded-xl p-8 w-full max-w-md'>
        <h2 className='text-3xl font-bold text-white text-center mb-8'>
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label className='block text-gray-300 mb-2'>Username</label>
            <input
              type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className='w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500'
              placeholder='Enter username'
              required
            />
          </div>

          <div>
            <label className='block text-gray-300 mb-2'>Password</label>
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500'
              placeholder='Enter password'
              required
            />
          </div>

          <button
            type='submit'
            disabled={loading}
            className='w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg disabled:opacity-50'
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className='text-gray-400 text-center mt-6'>
          Don't have an account?{" "}
          <Link to='/signup' className='text-blue-500 hover:text-blue-400'>
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
