import React, { memo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { siteName } from '../../config/envConfig';
import { useAuthStore } from '../../store/authStore';
import ProfileDropdown from '../base/ProfileDropdown';

const Navbar = ({ isAuthenticated }) => {
  const { user, logout } = useAuthStore();

  const handleLogout = useCallback(() => {
    logout();
  }, [logout]);

  return (
    <div className='sticky glass-panel p-0 top-0 left-0 right-0 z-50'>
      <div className='bg-[#454953] flex items-start justify-center px-0'>
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
          className='w-full bg-purple-600/50 backdrop-blur-xl border border-neutral-600 rounded-b-2xl px-6 py-3.5 flex items-center justify-between lg:justify-between'
        >
          <div className='flex items-center gap-6'>
            <div className='hidden'></div>
          </div>

          <div className='absolute left-1/2 block transform -translate-x-[65%] md:-translate-x-1/2'>
            <span className='text-white text-2xl font-semibold capitalize font-syncopate text-shadow'>
              <Link to='/'>{siteName}</Link>
            </span>
          </div>

          <div className='flex items-center gap-4'>
            {isAuthenticated && (
              <>
                <ProfileDropdown user={user} handleLogout={handleLogout} />
              </>
            )}
          </div>
        </motion.nav>
      </div>
    </div>
  );
};

export default memo(Navbar);
