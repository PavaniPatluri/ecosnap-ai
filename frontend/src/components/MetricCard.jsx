import React from 'react';

const MetricCard = ({ title, value, unit, icon: Icon, colorClass }) => {
  return (
    <div className={`bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center space-x-4 transition-transform hover:scale-105 ${colorClass}`}>
      <div className={`p-4 rounded-full bg-opacity-20 ${colorClass.replace('text-', 'bg-')}`}>
        <Icon className={`w-8 h-8`} />
      </div>
      <div>
        <p className="text-gray-500 dark:text-gray-400 text-sm font-medium uppercase tracking-wider">{title}</p>
        <div className="flex items-baseline space-x-1">
          <span className="text-2xl font-bold text-gray-900 dark:text-white">{value}</span>
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{unit}</span>
        </div>
      </div>
    </div>
  );
};

export default MetricCard;
