import React from 'react';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import FloatingShape from '../components/framer-motion/animations/FloatingShape';
import ParticlesBackground from '../components/base/ParticlesBackground';

const UserAuthLayout = () => {
  return (
    <main
      className="
        bg-background
        dark:bg-dark-background
        text-text dark:text-text-subdued"
    >
      <section className="relative z-10 overflow-hidden">
        <FloatingShape
          color="dark:bg-cyber-blue bg-cyber-blue"
          size="w-64 h-64"
          top="-5%"
          left="10%"
          delay={0}
        />
        <FloatingShape
          color="bg-dark-text-subdued"
          size="w-48 h-48"
          top="70%"
          left="80%"
          delay={5}
        />
        <FloatingShape
          color="bg-dark-tertiary"
          size="w-32 h-32"
          top="40%"
          left="-10%"
          delay={2}
        />
        <ParticlesBackground />
        <section className="flex items-center justify-center min-h-screen overflow-hidden">
          <Outlet />
        </section>
        <Toaster />
      </section>
    </main>
  );
};

export default UserAuthLayout;
