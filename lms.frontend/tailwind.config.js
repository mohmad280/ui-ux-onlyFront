/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        softPurple: '#efe6ff',
        pastelPurple: '#d9ccff',
        glowPurple: {
          DEFAULT: '#8b5cf6',
          light: '#a78bfa',
        },
      },
      boxShadow: {
        'glow-purple': '0 8px 30px rgba(139,92,246,0.18), 0 2px 6px rgba(139,92,246,0.08)',
      },
      keyframes: {
        orbRotate: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        'orb-rotate': 'orbRotate 12s linear infinite',
      },
    },
  },
  plugins: [],
};
