import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSignOutAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Edit } from 'lucide-react';
import { getOptimizedImageUrl } from '../../utils/imageOptimizer';

const ProfileDropdown = ({ user, handleLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleClickOutside = event => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const dropdownVariants = {
    open: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 30,
        staggerChildren: 0.1,
      },
    },
    closed: {
      opacity: 0,
      scale: 0.9,
      y: -10,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 30,
      },
    },
  };

  const animatedDropdown = useMemo(
    () => (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={dropdownVariants}
            className="absolute top-20 right-0 w-full max-w-sm bg-white dark:bg-dark-background p-3 rounded-lg divide-y divide-gray-200 border-t-2 border-l-2 border-cyber-purple ring-1 dark:divide-gray-800 shadow-[5px_5px_0px_0px_rgba(109,40,217)]"
          >
            {/* Header */}
            <div
              aria-label="header"
              className="flex items-center space-x-4 p-4"
            >
              <img
                src={
                  user.profileImage
                    ? getOptimizedImageUrl(user.profileImage)
                    : null
                }
                alt={user.username || user.name}
                className="w-16 h-16 rounded-full border-2 border-primary animate-pulse"
              />
              <div className="flex flex-col flex-1 truncate">
                <div className="text-xl font-medium text-gray-900 dark:text-white">
                  {user.name}
                </div>
                <p className="text-gray-500 dark:text-gray-400">{user.email}</p>
              </div>
              <button onClick={() => setIsOpen(false)}>
                {/* <FaCog className="w-6 h-6 text-gray-400 dark:text-gray-500" /> */}
                <svg
                  width="35px"
                  height="35px"
                  stroke="#292D32"
                  className="ring-1 ring-purple-400 rounded-full text-gray-400 dark:text-gray-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <path
                      opacity="0.4"
                      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                      // fill="#9ca3af"
                      fill="#efefef"
                    ></path>
                    <path
                      d="M13.0594 12.0001L15.3594 9.70011C15.6494 9.41011 15.6494 8.93011 15.3594 8.64011C15.0694 8.35011 14.5894 8.35011 14.2994 8.64011L11.9994 10.9401L9.69937 8.64011C9.40937 8.35011 8.92937 8.35011 8.63938 8.64011C8.34938 8.93011 8.34938 9.41011 8.63938 9.70011L10.9394 12.0001L8.63938 14.3001C8.34938 14.5901 8.34938 15.0701 8.63938 15.3601C8.78938 15.5101 8.97937 15.5801 9.16937 15.5801C9.35937 15.5801 9.54937 15.5101 9.69937 15.3601L11.9994 13.0601L14.2994 15.3601C14.4494 15.5101 14.6394 15.5801 14.8294 15.5801C15.0194 15.5801 15.2094 15.5101 15.3594 15.3601C15.6494 15.0701 15.6494 14.5901 15.3594 14.3001L13.0594 12.0001Z"
                      fill="#000"
                    ></path>
                  </g>
                </svg>
              </button>
            </div>

            {/* Navigation Links */}
            <div aria-label="navigation" className="py-2 space-y-1">
              <motion.span
                whileHover={{ scale: 1.03, backgroundColor: '#e5e7eb' }}
              >
                <Link
                  to={'/profile/edit'}
                  className="flex items-center py-2 px-4 text-lg text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md transition-all duration-150 ease-in-out"
                  onClick={() => setIsOpen(false)}
                >
                  <Edit className="w-6 h-6 text-green-500" />
                  <span className="ml-3">Edit Profile</span>
                </Link>
              </motion.span>
            </div>

            <div aria-label="footer" className="pt-2">
              <motion.button
                type="button"
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                whileHover={{ scale: 1.05, backgroundColor: '#e5e7eb' }}
                className="flex items-center w-full py-3 px-4 text-lg text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md transition-all duration-150 ease-in-out"
              >
                <FaSignOutAlt className="w-6 h-6 text-red-500" />
                <span className="ml-3">Logout</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    ),
    [isOpen, user, handleLogout]
  );

  return (
    <div
      className="flex items-center justify-center box-border"
      ref={dropdownRef}
    >
      <div
        onClick={toggleDropdown}
        className="flex items-center cursor-pointer space-x-2 px-1 py-[3px] box-border bg-indigo-600 hover:bg-indigo-500 rounded-full"
      >
        <img
          src={getOptimizedImageUrl(user.profileImage, {
            w: 50,
            h: 50,
            q: 'auto',
          })}
          alt={user.username}
          className="w-10 h-10 rounded-full"
        />

        {window.innerWidth > 768 && (
          <span className="font-medium text-text dark:text-dark-text">
            {user.username.length > 8
              ? `${user.username.slice(0, 8)}...`
              : user.username}
          </span>
        )}
      </div>

      {animatedDropdown}
    </div>
  );
};

export default React.memo(ProfileDropdown);
