import React, { useState, useEffect } from 'react';
import { ShieldAlert, Users, ScanLine, Activity } from 'lucide-react';
import api from '../api';

export default function AdminPanel() {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;
        
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        const [statsRes, usersRes] = await Promise.all([
          api.get('/admin/stats'),
          api.get('/admin/users')
        ]);
        
        setStats(statsRes.data);
        setUsers(usersRes.data);
      } catch (err) {
        setError('Failed to load admin data. Ensure you have admin privileges.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchAdminData();
  }, []);

  if (loading) return <div className="text-center p-8 text-white">Loading Admin Panel...</div>;
  
  if (error) return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="bg-red-900/50 border border-red-500 text-red-200 p-6 rounded-2xl flex items-center gap-4">
        <ShieldAlert size={32} />
        <div>
          <h2 className="text-xl font-bold">Access Denied</h2>
          <p>{error}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
          <ShieldAlert className="text-eco-400" />
          Admin Dashboard
        </h1>
        <p className="text-slate-400">Platform overview and user management.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-slate-800/50 backdrop-blur-md p-6 rounded-2xl border border-slate-700/50">
          <div className="flex items-center gap-3 text-eco-400 mb-2">
            <Users size={20} />
            <span className="font-medium">Total Users</span>
          </div>
          <p className="text-3xl font-bold text-white">{stats?.total_users}</p>
        </div>
        
        <div className="bg-slate-800/50 backdrop-blur-md p-6 rounded-2xl border border-slate-700/50">
          <div className="flex items-center gap-3 text-blue-400 mb-2">
            <ScanLine size={20} />
            <span className="font-medium">Total Scans</span>
          </div>
          <p className="text-3xl font-bold text-white">{stats?.total_scans}</p>
        </div>
        
        <div className="bg-slate-800/50 backdrop-blur-md p-6 rounded-2xl border border-slate-700/50">
          <div className="flex items-center gap-3 text-red-400 mb-2">
            <Activity size={20} />
            <span className="font-medium">Global CO₂ (kg)</span>
          </div>
          <p className="text-3xl font-bold text-white">{stats?.total_co2}</p>
        </div>
        
        <div className="bg-slate-800/50 backdrop-blur-md p-6 rounded-2xl border border-slate-700/50">
          <div className="flex items-center gap-3 text-emerald-400 mb-2">
            <Activity size={20} />
            <span className="font-medium">Avg EcoScore</span>
          </div>
          <p className="text-3xl font-bold text-white">{stats?.avg_eco_score}</p>
        </div>
      </div>

      <div className="bg-slate-800/50 backdrop-blur-md rounded-2xl border border-slate-700/50 overflow-hidden">
        <div className="p-6 border-b border-slate-700/50">
          <h2 className="text-xl font-bold text-white">Registered Users</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-800/80 text-slate-400 text-sm">
                <th className="p-4 font-medium">ID</th>
                <th className="p-4 font-medium">Username</th>
                <th className="p-4 font-medium">Email</th>
                <th className="p-4 font-medium">EcoPoints</th>
                <th className="p-4 font-medium">Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {users.map(user => (
                <tr key={user.id} className="text-slate-300 hover:bg-slate-700/20 transition-colors">
                  <td className="p-4">{user.id}</td>
                  <td className="p-4 font-medium text-white">{user.username}</td>
                  <td className="p-4">{user.email}</td>
                  <td className="p-4 text-eco-400 font-bold">{user.eco_points}</td>
                  <td className="p-4">
                    {user.is_admin ? (
                      <span className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-xs font-medium border border-purple-500/30">Admin</span>
                    ) : (
                      <span className="px-2 py-1 bg-slate-700 text-slate-300 rounded text-xs font-medium">User</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {users.length === 0 && (
            <div className="p-8 text-center text-slate-400">No users found.</div>
          )}
        </div>
      </div>
    </div>
  );
}
