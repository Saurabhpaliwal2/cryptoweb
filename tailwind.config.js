/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0a0a0c",
        surface: "#111114",
        primary: "#00f2fe",
        secondary: "#7000ff",
        accent: "#00d1ff",
        text: {
          primary: "#ffffff",
          secondary: "#a1a1aa",
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      boxShadow: {
        'neon-primary': '0 0 10px rgba(0, 242, 254, 0.5), 0 0 20px rgba(0, 242, 254, 0.2)',
        'neon-secondary': '0 0 10px rgba(112, 0, 255, 0.5), 0 0 20px rgba(112, 0, 255, 0.2)',
        'glass-hover': '0 0 30px rgba(0, 242, 254, 0.05)',
        'neon-glow': '0 0 15px rgba(0, 242, 254, 0.3)',
      },

      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
