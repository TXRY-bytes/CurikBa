import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/modules/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)', 'Fredoka', 'Nunito', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'Nunito', 'system-ui', 'sans-serif'],
      },
      colors: {
        bg: '#F6F9FC',
        surface: '#FFFFFF',
        'surface-2': '#EDF3F9',
        line: '#DAE5EF',
        'line-strong': '#C2D3E3',
        ink: '#14304A',
        'ink-2': '#56708A',
        'ink-3': '#8AA0B4',
        sky: '#5DB8F5',
        'sky-edge': '#2E8FD6',
        'sky-ink': '#1273BC',
        'sky-soft': '#DDEFFC',
        'sky-wash': '#EDF6FD',
        'on-sky': '#08263F',
        ok: '#3CC48A',
        'ok-edge': '#23995F',
        'ok-soft': '#E1F7EC',
        'ok-ink': '#137A4B',
        bad: '#EF6B63',
        'bad-edge': '#C74B44',
        'bad-soft': '#FDE9E7',
        'bad-ink': '#B02F28',
        'on-bad': '#2A0A0A',
        heart: '#F0576A',
        flame: '#F59A3D',
      },
      borderRadius: {
        '2xl': '18px',
        '3xl': '24px',
      },
    },
  },
  plugins: [],
}

export default config

