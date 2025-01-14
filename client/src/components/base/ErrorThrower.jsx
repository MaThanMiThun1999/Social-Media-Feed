import React from 'react';
import { motion } from 'framer-motion';

const ErrorThrower = ({
  error = 'Something went wrong. Please try again.',
}) => {
  return (
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="text-red-500 font-semibold lg:text-base text-sm mb-2 -mt-4 "
    >
      {error}
    </motion.p>
  );
};

export default ErrorThrower;
