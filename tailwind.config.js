/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        display: ['"BubbledotICG-FinePos"', '"Geist Pixel Circle"', '"Plus Jakarta Sans"', 'monospace', 'sans-serif'],
      },
      colors: {
        border: "#2A2A2E",
        input: "#2A2A2E",
        ring: "#E8934A",
        background: "#0A0A0B",
        foreground: "#F5F5F4",
        surface: {
          DEFAULT: '#141416',
          elevated: '#1C1C1F',
        },
        accent: {
          DEFAULT: '#E8934A',
          hover: '#F5A662',
          muted: 'rgba(232, 147, 74, 0.12)',
        },
        brand: {
          DEFAULT: '#E8934A',
          accent: '#E8934A',
          hover: '#F5A662',
          bg: '#0A0A0B',
          surface: '#141416',
          card: '#1C1C1F',
          border: '#2A2A2E',
        },
        amber: {
          400: '#E8934A',
          500: '#E8934A',
          600: '#F5A662',
        },
        semantic: {
          success: '#4ADE80',
          warning: '#FBBF24',
          error: '#F87171',
        }
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        'glow': '0 0 25px -5px rgba(232, 147, 74, 0.2)',
        'subtle': '0 1px 3px 0 rgba(0, 0, 0, 0.2)',
        'premium': '0 10px 30px -5px rgba(0, 0, 0, 0.5)',
      }
    },
  },
  plugins: [],
}

