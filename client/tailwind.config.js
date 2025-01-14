/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss/plugin';

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'space-grotesk': ['Space Grotesk', 'sans-serif'],
        syncopate: ['Syncopate', 'sans-serif'],
        'jetbrains-mono': ['JetBrains Mono', 'monospace'],
        'roboto-mono': ['Roboto Mono', 'monospace'],
        'ibm-plex-mono': ['IBM Plex Mono', 'monospace'],
        'share-tech-mono': ['Share Tech Mono', 'monospace'],
      },
      colors: {
        // Light Mode Colors
        primary: '#3490dc',
        'primary-dark': '#2779bd', // Darker version of primary
        secondary: '#ffed4a',
        'secondary-dark': '#f9ca24', // Darker version of secondary
        tertiary: '#38b2ac',
        'tertiary-dark': '#319795', // Darker version of tertiary
        background: '#f8fafc',
        surface: '#ffffff',
        text: '#1a202c',
        'text-subdued': '#718096',
        success: '#38a169',
        warning: '#ecc94b',
        danger: '#e53e3e',
        disabled: '#a0aec0',

        'plain-white-background': '#ffffff',
        'plain-black-background': '#000000',

        // Dark Mode Colors
        'dark-primary': '#1e40af', // Dark theme primary
        'dark-primary-dark': '#1a365d', // Darker variant for dark mode
        'dark-secondary': '#d97706',
        'dark-secondary-dark': '#92400e',
        'dark-tertiary': '#319795',
        'dark-tertiary-dark': '#2c7a7b',
        'dark-background': '#1a202c',
        'dark-surface': '#2d3748',
        'dark-text': '#f7fafc',
        'dark-text-subdued': '#a0aec0',
        'dark-success': '#48bb78',
        'dark-warning': '#f6e05e',
        'dark-danger': '#f56565',
        'dark-disabled': '#4a5568',
        'cyber-green': '#00FF41', // Cyber-themed colors
        'cyber-pink': '#FF0080',
        'cyber-blue': '#00FFFF',
        'cyber-purple': '#9400D3',

        'neon-pink': '#ff007a',
        'neon-blue': '#00f0ff',
        'neon-green': '#39ff14',
        'neon-yellow': '#ffe600',
        'neon-blue-dark': '#00c2cc',
      },
      boxShadow: {
        'neon-pink': '0 4px 15px rgba(255, 0, 122, 0.7)',

        'glow-primary': '0 0 15px rgba(37, 99, 235, 0.6)',
        'glow-secondary': '0 0 15px rgba(99, 102, 241, 0.6)',
        'inner-subtle': 'inset 0 2px 4px rgba(0, 0, 0, 0.1)',
      },
      backgroundImage: {
        'subtle-grid': 'var(--subtle-grid)',
        'radial-gradient': 'radial-gradient(var(--tw-gradient-stops))',
        'conic-gradient':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontSize: {
        xxs: '.625rem',
        xs: '.75rem',
        sm: '.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': '3.75rem',
        '7xl': '4.5rem',
        '8xl': '6rem',
        '9xl': '8rem',
      },
      letterSpacing: {
        tighter: '-.02em',
        tight: '-.01em',
        normal: '0',
        wide: '.01em',
        wider: '.02em',
        widest: '.03em',
      },
      lineHeight: {
        none: '1',
        tight: '1.25',
        snug: '1.375',
        normal: '1.5',
        relaxed: '1.625',
        loose: '2',
        'extra-tight': '1.1',
      },
      screens: {
        '3xs': '320px',
        '2xs': '375px',
        '3sm': '425px',
        xs: '480px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
      transitionDuration: {
        DEFAULT: '300ms',
        fast: '150ms',
        slow: '300ms',
      },
      keyframes: {
        'border-beam': {
          '100%': {
            'offset-distance': '100%',
          },
        },

        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        pulsate: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 5px var(--primary)' },
          '50%': { boxShadow: '0 0 15px var(--primary)' },
        },
        slideInUp: {
          '0%': { transform: 'translateY(100%)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        slideInDown: {
          '0%': { transform: 'translateY(-100%)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        'border-width': {
          from: {
            width: '10px',
            opacity: '0',
          },
          to: {
            width: '100px',
            opacity: '1',
          },
        },
        neonPulse: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        sparkle: {
          '0%, 100%': { opacity: '0.75', scale: '0.9' },
          '50%': { opacity: '1', scale: '1' },
        },
        marqueeHorizontal: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        marqueeVertical: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-100%)' },
        },
        'text-gradient': {
          to: {
            backgroundPosition: '200% center',
          },
        },
        'logo-cloud': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(calc(-100% - 4rem))' },
        },
      },
      animation: {
        'marquee-horizontal':
          'marqueeHorizontal var(--duration) linear infinite',
        'marquee-vertical': 'marqueeVertical var(--duration) linear infinite',
        sparkle: 'sparkle 2s ease-in-out infinite',

        neonPulse: 'neonPulse 1.5s infinite ease-in-out',

        fadeIn: 'fadeIn 0.5s ease-in-out',
        pulsate: 'pulsate 1.5s infinite ease-in-out',
        glow: 'glow 1.5s infinite ease-in-out',
        slideInUp: 'slideInUp 0.5s ease-in-out',
        slideInDown: 'slideInDown 0.5s ease-in-out',
        'text-gradient': 'text-gradient 1.5s linear infinite',

        'border-beam': 'border-beam calc(var(--duration)*1s) infinite linear',
        'border-width': 'border-width 3s infinite alternate',
        'logo-cloud': 'logo-cloud 30s linear infinite',
      },
    },
  },
  plugins: [
    plugin(function ({ addBase, addComponents, addUtilities, theme }) {
      addBase({});
      addComponents({
        // Existing components
        '.container': {
          '@apply max-w-[85rem] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12':
            {},
        },
        '.heading-gradient': {
          '@apply text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary':
            {},
        },
        '.h1': {
          '@apply font-semibold text-[2.5rem] leading-[3.25rem] md:text-[2.75rem] md:leading-[3.75rem] lg:text-[3.25rem] lg:leading-[4.0625rem] xl:text-[3.75rem] xl:leading-[4.5rem]':
            {},
        },
        '.h2': {
          '@apply text-[1.75rem] leading-[2.5rem] md:text-[2rem] md:leading-[2.5rem] lg:text-[2.5rem] lg:leading-[3.5rem] xl:text-[3rem] xl:leading-tight':
            {},
        },
        '.h3': {
          '@apply text-[2rem] leading-normal md:text-[2.5rem]': {},
        },
        '.h4': {
          '@apply text-[2rem] leading-normal': {},
        },
        '.h5': {
          '@apply text-2xl leading-normal': {},
        },
        '.h6': {
          '@apply font-semibold text-lg leading-8': {},
        },
        '.card-grid': {
          '@apply grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6': {},
        },
        '.neon-text': {
          '@apply text-transparent bg-clip-text bg-gradient-to-r from-cyber-pink to-cyber-blue':
            {}, // Custom neon effect
        },
        '.glass-panel': {
          '@apply bg-white/10 dark:bg-black/20 backdrop-blur-md rounded-lg p-6 shadow-inner-subtle':
            {}, // Glassmorphism effect
        },

        '.btn': {
          '@apply inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary':
            {},
        },
        '.btn-secondary': {
          '@apply inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-secondary hover:bg-secondary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary':
            {},
        },
        '.btn-tertiary': {
          '@apply inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-tertiary hover:bg-tertiary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-tertiary':
            {},
        },
        '.btn-outline': {
          '@apply inline-flex items-center justify-center px-4 py-2 border rounded-md shadow-sm text-base font-medium text-primary border-primary hover:bg-primary hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary':
            {},
        },

        // New input components
        '.input': {
          '@apply block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm':
            {},
        },
        '.input-error': {
          '@apply border-danger text-danger placeholder-danger focus:ring-danger focus:border-danger':
            {},
        },
        '.textarea': {
          '@apply block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm':
            {},
        },
        '.flex-center': {
          '@apply flex items-center justify-center': {},
        },
        // Card component
        '.card': {
          '@apply bg-surface shadow-lg rounded-lg overflow-hidden': {},
        },
        '.card-header': {
          '@apply px-6 py-4 border-b border-gray-200': {},
        },
        '.card-body': {
          '@apply p-6': {},
        },
        '.card-footer': {
          '@apply px-6 py-4 border-t border-gray-200': {},
        },

        // Badge component
        '.badge': {
          '@apply inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-primary text-white':
            {},
        },
        '.badge-secondary': {
          '@apply bg-secondary': {},
        },
        '.badge-tertiary': {
          '@apply bg-tertiary': {},
        },
      });
      addUtilities({
        // Existing utilities
        '.tap-highlight-color': {
          '-webkit-tap-highlight-color': 'rgba(0, 0, 0, 0)',
        },
        '.text-shadow': {
          'text-shadow': '0 2px 4px rgba(0, 0, 0, 0.5)', // Text shadow effect
        },
        '.text-stroke': {
          '-webkit-text-stroke': '1px var(--text)',
          'text-shadow': '0 0 2px var(--text)', // Text stroke effect
        },
        '.hover-scale': {
          '@apply transition-transform transform hover:scale-105': {}, // Hover scaling
        },
        '.clip-path-polygon': {
          'clip-path': 'polygon(50% 0%, 100% 100%, 0% 100%)', // Polygon clip path
        },
        '.pulsate': {
          '@apply animate-pulsate': {},
        },
        '.fade-in': {
          '@apply animate-fadeIn': {},
        },

        // New utilities
        '.scrollbar-hide': {
          /* Hide scrollbar for IE, Edge, and Firefox */
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          /* Hide scrollbar for Chrome, Safari, and Opera */
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
        '.bg-grid': {
          '@apply bg-subtle-grid': {},
        },
        '.transition-default': {
          '@apply transition-all duration-300 ease-in-out': {},
        },
        '.focus-ring': {
          '@apply focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary':
            {},
        },
      });
    }),
  ],
};
