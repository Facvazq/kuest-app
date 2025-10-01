import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        kuest: {
          green: '#22c55e',
          'green-dark': '#16a34a',
          'green-light': '#4ade80',
          black: '#000000',
          'black-light': '#1a1a1a',
          'black-dark': '#0a0a0a',
        },
      },
      backgroundImage: {
        'kuest-gradient': 'linear-gradient(135deg, #22c55e 0%, #16a34a 50%, #000000 100%)',
        'kuest-gradient-reverse': 'linear-gradient(135deg, #000000 0%, #16a34a 50%, #22c55e 100%)',
        'kuest-hero': 'linear-gradient(135deg, #22c55e 0%, #16a34a 25%, #000000 75%, #0a0a0a 100%)',
      },
      animation: {
        'kuest-pulse': 'kuest-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'kuest-bounce': 'kuest-bounce 1s infinite',
        'kuest-spin': 'kuest-spin 3s linear infinite',
        'kuest-float': 'kuest-float 6s ease-in-out infinite',
        'kuest-glow': 'kuest-glow 2s ease-in-out infinite alternate',
        'apple-scale': 'apple-scale 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        'apple-fade': 'apple-fade 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'apple-slide': 'apple-slide 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'kuest-3d-rotate': 'kuest-3d-rotate 8s ease-in-out infinite',
        'kuest-3d-float': 'kuest-3d-float 4s ease-in-out infinite',
        'kuest-morph': 'kuest-morph 6s ease-in-out infinite',
      },
      keyframes: {
        'kuest-pulse': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        'kuest-bounce': {
          '0%, 100%': { transform: 'translateY(-25%)', animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)' },
          '50%': { transform: 'translateY(0)', animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)' },
        },
        'kuest-spin': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'kuest-float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'kuest-glow': {
          '0%': { boxShadow: '0 0 5px #22c55e, 0 0 10px #22c55e, 0 0 15px #22c55e' },
          '100%': { boxShadow: '0 0 10px #22c55e, 0 0 20px #22c55e, 0 0 30px #22c55e' },
        },
        'apple-scale': {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1)' },
        },
        'apple-fade': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'apple-slide': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'kuest-3d-rotate': {
          '0%': { transform: 'rotateX(0deg) rotateY(0deg) rotateZ(0deg)' },
          '25%': { transform: 'rotateX(10deg) rotateY(90deg) rotateZ(5deg)' },
          '50%': { transform: 'rotateX(0deg) rotateY(180deg) rotateZ(0deg)' },
          '75%': { transform: 'rotateX(-10deg) rotateY(270deg) rotateZ(-5deg)' },
          '100%': { transform: 'rotateX(0deg) rotateY(360deg) rotateZ(0deg)' },
        },
        'kuest-3d-float': {
          '0%, 100%': { transform: 'translateY(0px) translateZ(0px)' },
          '50%': { transform: 'translateY(-30px) translateZ(20px)' },
        },
        'kuest-morph': {
          '0%, 100%': { borderRadius: '20px', transform: 'scale(1)' },
          '25%': { borderRadius: '50px', transform: 'scale(1.1)' },
          '50%': { borderRadius: '10px', transform: 'scale(0.9)' },
          '75%': { borderRadius: '30px', transform: 'scale(1.05)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
