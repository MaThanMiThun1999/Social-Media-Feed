import { CircleXIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useUserProfileStore } from '../store/userProfileStore';
import ProfileDetails from '../components/userProfile/ProfileDetails';
import UpdateProfileForm from '../components/userProfile/UpdateProfileForm';
import LoadingSpinner from '../components/animations/loader/LoadingSpinner';
import UploadProfileImage from '../components/userProfile/UploadProfileImage';
import ChangePasswordForm from '../components/userProfile/ChangePasswordForm';

function ProfileEditPagez() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState('Profile Details');
  const sidebarRef = useRef(null);
  const { fetchUserProfile, user, isLoading } = useUserProfileStore();

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  const handleClickOutside = useCallback(event => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setSidebarOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  if (isLoading) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }

  if (!user) {
    return <div>User not found.</div>;
  }

  const renderContent = () => {
    switch (activeMenuItem) {
      case 'Profile Details':
        return (
          <div>
            <h2 className="text-3xl font-semibold mb-6">Profile Details</h2>
            <ProfileDetails user={user} />
          </div>
        );
      case 'Update Profile Info':
        return (
          <div>
            <h2 className="text-3xl font-semibold mb-6">Update Profile Info</h2>
            <UpdateProfileForm />
          </div>
        );
      case 'Update Image':
        return (
          <div>
            <h2 className="text-3xl font-semibold mb-6">
              Update Profile Image
            </h2>
            <UploadProfileImage />
          </div>
        );

      case 'Change Password':
        return (
          <div>
            <h2 className="text-3xl font-semibold mb-6">Change Password</h2>
            <ChangePasswordForm />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className=' w-full flex flex-col md:flex-row gap-8 px-4 lg:px-20 xl:px-32 text-[#161931] dark:text-dark-text'>
      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`fixed rounded-lg border-r-2 border-neutral-400 md:static my-4 top-0 left-0 z-[10] w-64 h-full glass-panel p-0 shadow-lg transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 transition-transform`}
      >
        <div className='flex flex-col h-full p-6 border-r border-gray-200 dark:border-dark-surface'>

          <h2 className='text-2xl font-semibold md:m-2 mt-16 mb-6'>
            Edit Profile
          </h2>
          {[
            { label: 'Profile Details', value: 'Profile Details' },
            { label: 'Update Profile Info', value: 'Update Profile Info' },
            { label: 'Update Image', value: 'Update Image' },
            { label: 'Change Password', value: 'Change Password' },
          ].map((item) => (
            <button
              key={item.value}
              onClick={() => {
                setActiveMenuItem(item.value);
                setSidebarOpen(false);
              }}
              className={`flex items-center px-4 py-2.5 rounded-full font-semibold ${
                activeMenuItem === item.value
                  ? 'bg-indigo-100 text-indigo-900 dark:bg-dark-surface dark:text-dark-text border dark:border-dark-disabled'
                  : 'hover:text-indigo-900 dark:hover:text-dark-primary hover:bg-gray-100 dark:hover:bg-dark-background'
              }`}
            >
              {item.label}
            </button>
          ))}
          <button
            className='md:hidden flex-center self-end mt-4 ring-1 ring-neutral-400 px-2 rounded-xl'
            onClick={() => setSidebarOpen(false)}
          >
            <CircleXIcon className='w-4 h-5 mr-1 ' /> Close
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className='w-full md:w-3/4 lg:w-4/5 min-h-screen py-4'>
        <button
          className='md:hidden flex-center mb-6 px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300'
          onClick={() => setSidebarOpen(!isSidebarOpen)}
        >
          <svg
            width='16'
            height='16'
            className='mr-2'
            viewBox='0 0 16 16'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            stroke='#fff'
          >
            <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
            <g
              id='SVGRepo_tracerCarrier'
              strokeLinecap='round'
              strokeLinejoin='round'
            ></g>
            <g id='SVGRepo_iconCarrier'>
              {' '}
              <path
                d='M11 0L16 5L14 7V12L3 16L2.20711 15.2071L6.48196 10.9323C6.64718 10.9764 6.82084 11 7 11C8.10457 11 9 10.1046 9 9C9 7.89543 8.10457 7 7 7C5.89543 7 5 7.89543 5 9C5 9.17916 5.02356 9.35282 5.06774 9.51804L0.792893 13.7929L0 13L4 2H9L11 0Z'
                fill='#fff'
              ></path>{' '}
            </g>
          </svg>{' '}
          Edit
        </button>

        <motion.div
          className='max-w-5xl mx-auto p-6 bg-white dark:bg-dark-surface rounded-lg shadow-lg'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {renderContent()}
        </motion.div>
      </main>
    </div>
  );
}

export default ProfileEditPagez;
