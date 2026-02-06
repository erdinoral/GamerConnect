/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        'neon-cyan': '#00ffff',
        'neon-purple': '#b026ff',
        'neon-gold': '#ffd700',
        'neon-blue': '#00d4ff',
        'neon-pink': '#ff00ff',
        'neon-green': '#00ff00',
        'neon-red': '#ff0040',
        'bg-primary': '#0a0a0f',
        'bg-secondary': '#0f0f1a',
        'bg-tertiary': '#151520',
      },
      backgroundImage: {
        'gradient-neon-blue': 'linear-gradient(135deg, #00d4ff 0%, #0099cc 100%)',
        'gradient-neon-purple': 'linear-gradient(135deg, #b026ff 0%, #7a1fb8 100%)',
        'gradient-neon-gold': 'linear-gradient(135deg, #ffd700 0%, #ffaa00 100%)',
        'gradient-neon-cyan': 'linear-gradient(135deg, #00ffff 0%, #00cccc 100%)',
      },
      boxShadow: {
        'neon-blue': '0 0 20px rgba(0, 212, 255, 0.5), 0 0 40px rgba(0, 212, 255, 0.3), 0 0 60px rgba(0, 212, 255, 0.2)',
        'neon-purple': '0 0 20px rgba(176, 38, 255, 0.5), 0 0 40px rgba(176, 38, 255, 0.3), 0 0 60px rgba(176, 38, 255, 0.2)',
        'neon-gold': '0 0 20px rgba(255, 215, 0, 0.5), 0 0 40px rgba(255, 215, 0, 0.3), 0 0 60px rgba(255, 215, 0, 0.2)',
        'neon-cyan': '0 0 20px rgba(0, 255, 255, 0.5), 0 0 40px rgba(0, 255, 255, 0.3), 0 0 60px rgba(0, 255, 255, 0.2)',
      },
      backdropBlur: {
        'glass': '20px',
      },
      backgroundColor: {
        'glass': 'rgba(15, 15, 26, 0.6)',
      },
    },
  },
  plugins: [],
}
