import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

const SpotlightButton = ({
  children,
  classNamesForButtonContainer = 'rounded-lg bg-slate-950 px-4 py-3 text-lg font-medium w-full text-white',
  classNamesForAnimatedSpan = 'absolute left-[50%] top-[50%] h-32 w-32 -translate-x-[50%] -translate-y-[50%] rounded-full bg-slate-100',
  whileTapEffect = { scale: 0.985 },
  ...props
}) => {
  const btnRef = useRef(null);
  const spanRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = e => {
      const { width } = e.target.getBoundingClientRect();
      const offset = e.offsetX;
      const left = `${(offset / width) * 100}%`;

      spanRef.current.animate({ left }, { duration: 250, fill: 'forwards' });
    };

    const handleMouseLeave = () => {
      spanRef.current.animate(
        { left: '50%' },
        { duration: 100, fill: 'forwards' }
      );
    };

    const btn = btnRef.current;
    if (btn) {
      btn.addEventListener('mousemove', handleMouseMove);
      btn.addEventListener('mouseleave', handleMouseLeave);
    }

    // Cleanup the event listeners on unmount
    return () => {
      if (btn) {
        btn.removeEventListener('mousemove', handleMouseMove);
        btn.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <motion.button
      ref={btnRef}
      className={`relative overflow-hidden ${classNamesForButtonContainer}`}
      whileTap={whileTapEffect}
      {...props}
    >
      <span className="pointer-events-none relative z-10 mix-blend-difference">
        {children || 'Button'}
      </span>
      <span
        ref={spanRef}
        className={`pointer-events-none ${classNamesForAnimatedSpan}`}
      />
    </motion.button>
  );
};

export default SpotlightButton;
