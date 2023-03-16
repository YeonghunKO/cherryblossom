const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        totalBg: "url('../public/backgrounds/totalBg.svg')",
        brownBorder: "url('../public/creation/brownBorder.svg')",
      },
      dropShadow: {
        pageTitle: '0 4px 0px #FFC9D4',
      },
      colors: {
        skyBlue: '#CCE7F8',
        'btn-yellow': '#FAF1A2',
        blossom: {
          yellow: '#FAF1A2',
          green: '#AFE6AD',
          lightPink: '#FEEFF4',
          pink: '#FFC9D4',
          gray: '#D9D9D9',
          darkGray: '#868686',
          lightBlue: '#CCE7F8',
          white: '#ffffff',
          black: '#131210',
        },
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-out',
        'fall-flower': 'fallFlower 10s infinite',
      },
      keyframes: {
        'pull-out': {
          '0%': { transform: 'translateY(20px) scale(0.9)', 'z-index': 10 },
          '50%': { transform: 'translateY(-80px) scale(0.9)', 'z-index': 20 },
          '100%': { transform: 'translateY(0px)' },
        },
        envelope: {
          '0%': { transform: 'rotateX(-180deg)' },
          '100%': { transform: 'rotateX(0)' },
        },
        fadeIn: {
          '0%': {
            opacity: '0',
            transform: 'translateX(-50%) translateY(-40%)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(-50%) translateY(-50%)',
          },
        },
        fallFlower: {
          '0%': { transform: 'translateX(0%) translateY(0%) rotateY(0deg)' },
          '100%': { transform: 'translateX(-400px) translateY(1400px) rotateZ(-359deg)' },
        },
      },
      fontFamily: {
        sans: ['var(--font-jamjaFlower)', ...fontFamily.sans],
        pretendard: ['var(--font-pretendard)'],
      },
    },
    plugins: [],
    corePlugins: {
      fontFamily: true,
    },
  },
};
