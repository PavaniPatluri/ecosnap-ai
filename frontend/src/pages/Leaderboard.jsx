import React, { useEffect, useState } from 'react';
import { Trophy, Medal, Award } from 'lucide-react';
import api from '../api';

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const { data } = await api.get('/users/leaderboard');
        setLeaders(data);
      } catch (err) {
        console.error("Failed to fetch leaderboard");
      }
    };
    fetchLeaderboard();
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900 flex justify-center items-center">
          <Trophy className="h-10 w-10 text-yellow-500 mr-4" />
          Eco Champions
        </h1>
        <p className="mt-4 text-gray-600 text-lg">Top users making the biggest impact.</p>
      </div>

      <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="bg-gray-50 border-b border-gray-100 px-8 py-4 grid grid-cols-12 gap-4 font-semibold text-gray-500 uppercase text-sm tracking-wider">
          <div className="col-span-2 text-center">Rank</div>
          <div className="col-span-7">Eco Warrior</div>
          <div className="col-span-3 text-right">Points</div>
        </div>
        
        <div className="divide-y divide-gray-50">
          {leaders.map((user, index) => (
            <div key={user.id} className="px-8 py-6 grid grid-cols-12 gap-4 items-center hover:bg-gray-50 transition-colors">
              <div className="col-span-2 flex justify-center items-center">
                {index === 0 && <Trophy className="h-8 w-8 text-yellow-400 drop-shadow-md" />}
                {index === 1 && <Medal className="h-8 w-8 text-gray-400 drop-shadow-md" />}
                {index === 2 && <Award className="h-8 w-8 text-amber-600 drop-shadow-md" />}
                {index > 2 && <span className="text-xl font-bold text-gray-400">#{index + 1}</span>}
              </div>
              <div className="col-span-7 flex items-center space-x-4">
                <div className={`h-12 w-12 rounded-full flex items-center justify-center font-bold text-lg
                  ${index === 0 ? 'bg-yellow-100 text-yellow-700 border-2 border-yellow-200' : 
                    index === 1 ? 'bg-gray-100 text-gray-700 border-2 border-gray-200' :
                    index === 2 ? 'bg-amber-50 text-amber-700 border-2 border-amber-200' :
                    'bg-eco-50 text-eco-700 border border-eco-100'}`}
                >
                  {user.username.charAt(0).toUpperCase()}
                </div>
                <span className={`text-lg ${index < 3 ? 'font-bold text-gray-900' : 'font-medium text-gray-700'}`}>
                  {user.username}
                </span>
              </div>
              <div className="col-span-3 text-right">
                <span className={`text-2xl font-black ${index === 0 ? 'text-yellow-500' : 'text-gray-900'}`}>
                  {user.eco_points}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
