import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Camera, LayoutDashboard, Trophy, LogOut, Leaf, Globe } from 'lucide-react';

import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Scanner from './pages/Scanner';
import Leaderboard from './pages/Leaderboard';
import AdminPanel from './pages/AdminPanel';
import Awareness from './pages/Awareness';
import { ThemeProvider } from './contexts/ThemeContext';
import ThemeSettings from './components/ThemeSettings';
import api from './api';

const Navigation = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/auth');
  };

  const [isAdmin, setIsAdmin] = React.useState(false);

  React.useEffect(() => {
    if (token) {
      api.get('/users/me', { headers: { Authorization: `Bearer ${token}` } })
        .then(res => setIsAdmin(res.data.is_admin))
        .catch(() => {});
    }
  }, [token]);

  if (!token) return null;

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 sticky top-0 z-50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-2">
            <div className="bg-eco-100 dark:bg-eco-900/30 p-2 rounded-lg transition-colors">
              <Leaf className="h-6 w-6 text-eco-600 dark:text-eco-400" />
            </div>
            <span className="text-xl font-black text-gray-900 dark:text-white tracking-tight transition-colors">EcoSnap<span className="text-eco-600 dark:text-eco-400">AI</span></span>
          </div>
          <div className="flex items-center space-x-1 sm:space-x-4">
            <Link to="/" className="text-gray-600 hover:text-eco-600 px-3 py-2 rounded-md text-sm font-medium flex items-center transition-colors">
              <LayoutDashboard className="h-5 w-5 mr-1.5" /> <span className="hidden sm:inline">Dashboard</span>
            </Link>
            <Link to="/scanner" className="text-gray-600 hover:text-eco-600 px-3 py-2 rounded-md text-sm font-medium flex items-center transition-colors">
              <Camera className="h-5 w-5 mr-1.5" /> <span className="hidden sm:inline">Scanner</span>
            </Link>
            <Link to="/leaderboard" className="text-gray-600 hover:text-eco-600 px-3 py-2 rounded-md text-sm font-medium flex items-center transition-colors">
              <Trophy className="h-5 w-5 mr-1.5" /> <span className="hidden sm:inline">Leaderboard</span>
            </Link>
            <Link to="/awareness" className="text-gray-600 hover:text-eco-600 px-3 py-2 rounded-md text-sm font-medium flex items-center transition-colors">
              <Globe className="h-5 w-5 mr-1.5" /> <span className="hidden sm:inline">Awareness</span>
            </Link>
            {isAdmin && (
              <Link to="/admin" className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 px-3 py-2 rounded-md text-sm font-medium flex items-center transition-colors">
                <span className="hidden sm:inline">Admin</span>
              </Link>
            )}
            <ThemeSettings />
            <button onClick={handleLogout} className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 px-3 py-2 rounded-md text-sm font-medium flex items-center transition-colors">
              <LogOut className="h-5 w-5 sm:mr-1.5" /> <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Auth />;
};

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 font-sans transition-colors duration-300">
          <Navigation />
          <main className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
            <Routes>
              <Route path="/auth" element={<Auth />} />
              <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
              <Route path="/scanner" element={<PrivateRoute><Scanner /></PrivateRoute>} />
              <Route path="/leaderboard" element={<PrivateRoute><Leaderboard /></PrivateRoute>} />
              <Route path="/awareness" element={<PrivateRoute><Awareness /></PrivateRoute>} />
              <Route path="/admin" element={<PrivateRoute><AdminPanel /></PrivateRoute>} />
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
