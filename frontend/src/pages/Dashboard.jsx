import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Trophy, Zap, Droplets, Cloud, User, Leaf } from 'lucide-react';
import api from '../api';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [scans, setScans] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await api.get('/users/me');
        setUser(data);
      } catch (err) {
        console.error("Failed to fetch user");
      }
    };
    const fetchScans = async () => {
      try {
        const { data } = await api.get('/scans/');
        setScans(data);
      } catch (err) {
        console.error("Failed to fetch scans");
      }
    };
    fetchUser();
    fetchScans();
  }, []);

  if (!user) return <div className="text-center mt-20">Loading Dashboard...</div>;

  const totalCarbon = scans.reduce((acc, curr) => acc + curr.carbon_footprint, 0).toFixed(2);
  const totalWater = scans.reduce((acc, curr) => acc + curr.water_footprint, 0).toFixed(2);
  const avgEcoScore = scans.length ? Math.round(scans.reduce((acc, curr) => acc + curr.eco_score, 0) / scans.length) : 0;

  const chartData = scans.slice(-7).map((s, i) => ({
    name: s.object_name.substring(0, 10),
    carbon: s.carbon_footprint
  }));

  const badges = [];
  if (scans.length >= 1) badges.push({ name: 'First Step', icon: '🌱', color: 'bg-green-100 text-green-800' });
  if (user.eco_points >= 50) badges.push({ name: 'Eco Beginner', icon: '🌿', color: 'bg-blue-100 text-blue-800' });
  if (user.eco_points >= 100) badges.push({ name: 'Carbon Crusher', icon: '🦸', color: 'bg-purple-100 text-purple-800' });
  if (scans.length >= 5) badges.push({ name: 'Curious Mind', icon: '🔍', color: 'bg-yellow-100 text-yellow-800' });
  if (scans.filter(s => s.eco_score > 80).length >= 3) badges.push({ name: 'Green Guru', icon: '🌍', color: 'bg-emerald-100 text-emerald-800' });

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="flex items-center space-x-6">
          <div className="h-20 w-20 bg-eco-100 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
            <User className="h-10 w-10 text-eco-600" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Welcome, {user.username}!</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Keep up the sustainable lifestyle.</p>
          </div>
        </div>
        <div className="text-center bg-yellow-50 p-6 rounded-2xl border border-yellow-100 min-w-[150px]">
          <Trophy className="mx-auto h-8 w-8 text-yellow-500 mb-2" />
          <p className="text-xs uppercase font-bold text-yellow-700 tracking-wider">EcoPoints</p>
          <p className="text-4xl font-black text-yellow-600">{user.eco_points}</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
        <h3 className="font-bold text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-2">
          <Trophy className="h-5 w-5 text-yellow-500" /> Your Badges
        </h3>
        <div className="flex flex-wrap gap-4">
          {badges.length > 0 ? (
            badges.map((b, i) => (
              <div key={i} className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold border border-opacity-20 ${b.color} shadow-sm transition-transform hover:scale-105`}>
                <span className="text-xl">{b.icon}</span>
                <span>{b.name}</span>
              </div>
            ))
          ) : (
            <p className="text-gray-400 italic text-sm">Scan items to start earning badges!</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-700 dark:text-gray-300">Total Carbon</h3>
            <Cloud className="text-red-500 h-6 w-6" />
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{totalCarbon} <span className="text-lg font-medium text-gray-500 dark:text-gray-400">kg CO₂</span></p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-700 dark:text-gray-300">Total Water</h3>
            <Droplets className="text-blue-500 h-6 w-6" />
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{totalWater} <span className="text-lg font-medium text-gray-500 dark:text-gray-400">L</span></p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 bg-eco-50 rounded-full opacity-50 z-0"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-700 dark:text-gray-300">Avg EcoScore</h3>
              <Leaf className="text-eco-500 h-6 w-6" />
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{avgEcoScore} <span className="text-lg font-medium text-gray-500 dark:text-gray-400">/ 100</span></p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Recent Carbon Footprint</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="name" tick={{fill: '#6b7280', fontSize: 12}} axisLine={false} tickLine={false} />
                <Tooltip cursor={{fill: '#f3f4f6'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}} />
                <Bar dataKey="carbon" fill="#4ade80" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Scan History</h3>
          <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
            {scans.slice().reverse().map(scan => (
              <div key={scan.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-xl hover:bg-gray-100 dark:bg-gray-700 transition-colors">
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">{scan.object_name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{new Date(scan.created_at).toLocaleDateString()}</p>
                </div>
                <div className="text-right flex items-center">
                   <div className="bg-white dark:bg-gray-800 px-3 py-1 rounded-full text-xs font-bold shadow-sm border border-gray-100 dark:border-gray-700 flex items-center">
                     <span className="text-eco-600 mr-1">Score:</span> {scan.eco_score}
                   </div>
                </div>
              </div>
            ))}
            {scans.length === 0 && <p className="text-gray-500 dark:text-gray-400 text-center py-8">No scans yet. Try scanning an item!</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
