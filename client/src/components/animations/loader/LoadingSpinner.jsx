import React, { useMemo } from 'react';
import LOADINGIMG from '../../../../public/logo.png';

const LoadingSpinner = () => {
  return (
    <div className="flex-center flex-col w-full h-screen bg-dark-background overflow-hidden text-white">
      <div className="relative flex justify-center items-center">
        <div className="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-blue-500"></div>
        <img src={LOADINGIMG} className="rounded-full h-20 w-20 bg-slate-400" alt="Logo" />
      </div>
    </div>
  );
};

export default React.memo(LoadingSpinner);