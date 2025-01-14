import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Edit, SquareUser, PenTool } from 'lucide-react';
import OptimizedImage from '../base/OptimizedImage';

const ProfileDetails = memo(({ user }) => {
  console.log('user: ', user);
  return (
    <div className="space-y-3 overflow-x-hidden">
      {user.profileImage && (
        <motion.div
          className="mb-0 flex-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
        
          <OptimizedImage
            src={user.profileImage}
            alt={user.username}
            className="w-48 h-48 aspect-square rounded object-cover shadow-2xl"
          />
        </motion.div>
      )}

      {user.name && (
        <motion.div
          className="flex items-center space-x-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <SquareUser className="text-primary" />
          <span className="font-semibold text-lg">Name:</span>
          <span className="text-gray-100">{user.name}</span>
        </motion.div>
      )}

      <motion.div
        className="flex items-center space-x-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <User className="text-primary" />
        <span className="font-semibold text-lg">Username:</span>
        <span className="text-gray-100">{user.username}</span>
      </motion.div>

      {user.phoneNumber && (
        <motion.div
          className="flex items-center space-x-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Phone className="text-primary" />
          <span className="font-semibold text-lg">Phone Number:</span>
          <span className="text-gray-100">{user.phoneNumber}</span>
        </motion.div>
      )}

      <motion.div
        className="flex items-center space-x-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <Mail className="text-primary" />
        <span className="font-semibold text-lg">Email:</span>
        <span className="text-gray-100 text-wrap overflow-hidden">{user.email}</span>
      </motion.div>

      {user.bio && (
        <motion.div
          className="flex items-center space-x-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <PenTool className="text-primary" />
          <span className="font-semibold text-lg">Bio:</span>
          <span className="text-gray-100">{user.bio}</span>
        </motion.div>
      )}
    </div>
  );
});

export default ProfileDetails;
