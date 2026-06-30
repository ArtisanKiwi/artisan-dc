import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@relume_io/relume-ui/dist/**/*.{js,ts,jsx,tsx}',
  ],
  presets: [require('@relume_io/relume-tailwind')],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0D1B2A',
          light: '#102945',
          mid: '#1A3047',
        },
        slate: {
          DEFAULT: '#415A77',
          light: '#5E7A96',
          dim: '#2D4459',
        },
        gold: {
          DEFAULT: '#EAB308',
          light: '#FCD34D',
          dim: '#7a5518',
        },
        cream: '#F7F3E9',
      },
      fontFamily: {
        display: ['var(--font-dm-sans)', 'sans-serif'],
        sans: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.04em',
        tighter: '-0.03em',
        tight: '-0.02em',
        widest: '0.15em',
      },
    },
  },
  plugins: [],
}

export default config
