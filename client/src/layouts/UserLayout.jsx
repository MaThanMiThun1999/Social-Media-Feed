import React, { useMemo } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/global/Navbar';

import { useAuthStore } from '../store/authStore';
import ParticlesBackground from '../components/base/ParticlesBackground';

const UserLayout = () => {
  const { isAuthenticated } = useAuthStore();

  return (
    <div
      className=' bg-background
        dark:bg-dark-background/80
        text-text dark:text-white'
    >
      <div>
        {isAuthenticated && <Navbar isAuthenticated={isAuthenticated} />}
      </div>
      <ParticlesBackground />

      <main className='relative container mx-auto pb-5 divide-gray-200 dark:divide-gray-700'>
        <Outlet />
      </main>
    </div>
  );
};

export default UserLayout;
