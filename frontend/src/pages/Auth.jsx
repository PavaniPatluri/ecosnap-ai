import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Leaf } from 'lucide-react';
import api from '../api';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (isLogin) {
        const formData = new URLSearchParams();
        formData.append('username', username);
        formData.append('password', password);
        const res = await api.post('/auth/login', formData);
        localStorage.setItem('token', res.data.access_token);
        navigate('/');
      } else {
        await api.post('/auth/register', { username, email, password });
        setIsLogin(true);
      }
    } catch (err) {
      setError(err.response?.data?.detail || 'Authentication failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-eco-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-10 rounded-3xl shadow-xl">
        <div className="text-center">
          <div className="flex justify-center">
            <div className="bg-eco-100 p-3 rounded-2xl">
              <Leaf className="h-12 w-12 text-eco-600" />
            </div>
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
            {isLogin ? 'Sign in to EcoSnap' : 'Join the Movement'}
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Track your impact. Make a difference.
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && <div className="text-red-500 text-sm text-center bg-red-50 p-3 rounded-lg">{error}</div>}
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <input
                type="text"
                required
                className="appearance-none rounded-xl relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 dark:text-white focus:outline-none focus:ring-eco-500 focus:border-eco-500 focus:z-10 sm:text-sm"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            {!isLogin && (
              <div>
                <input
                  type="email"
                  required
                  className="appearance-none rounded-xl relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 dark:text-white focus:outline-none focus:ring-eco-500 focus:border-eco-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            )}
            <div>
              <input
                type="password"
                required
                className="appearance-none rounded-xl relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 dark:text-white focus:outline-none focus:ring-eco-500 focus:border-eco-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-eco-600 hover:bg-eco-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-eco-500 transition-colors"
            >
              {isLogin ? 'Sign in' : 'Sign up'}
            </button>
          </div>
        </form>
        <div className="text-center mt-4">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-eco-600 hover:text-eco-500 text-sm font-medium"
          >
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
