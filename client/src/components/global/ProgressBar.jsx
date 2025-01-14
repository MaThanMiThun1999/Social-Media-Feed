import React from 'react';

const ProgressBar = ({ progress }) => {
  return (
    <div className="mt-4">
      <div className="relative w-full bg-gray-200 rounded">
        <div
          className="absolute bg-gradient-to-r from-blue-500 to-green-400 h-2 rounded transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="text-center mt-2">{progress}%</p>
    </div>
  );
};

export default ProgressBar;
