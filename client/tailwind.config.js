/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#fff0f2',
          100: '#ffd6dc',
          300: '#f87389',
          400: '#e0162b',
          500: '#C41230',
          600: '#a30f28',
          700: '#7d0b1e',
        },
        navy: {
          900: '#0a0e2a',
          800: '#1a2060',
          700: '#222880',
          600: '#2d3398',
        },
        dark: {
          900: '#ffffff',
          800: '#f8fafc',
          700: '#f1f5f9',
          600: '#e8ecf4',
          500: '#cbd5e1',
          400: '#94a3b8',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
