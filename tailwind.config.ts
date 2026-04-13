import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // ── Brand Surface Hierarchy ──────────────────────────────────────
        background:                '#fdf9f3',   // Level 0 — cream base
        'surface':                 '#fdf9f3',
        'surface-bright':          '#fdf9f3',
        'surface-dim':             '#dddad4',
        'surface-container-lowest':'#ffffff',   // Level 2 — card white
        'surface-container-low':   '#f7f3ed',   // Level 0→1 transition
        'surface-container':       '#f1ede7',   // Level 1 — section bg
        'surface-container-high':  '#ebe8e2',
        'surface-container-highest':'#e6e2dc',
        'surface-variant':         '#e6e2dc',
        'surface-tint':            '#006a62',

        // ── Primary (Teal) ────────────────────────────────────────────────
        primary:                   '#006a62',   // Deep teal
        'primary-container':       '#1aada0',   // Teal medium
        'primary-fixed':           '#7bf7e8',
        'primary-fixed-dim':       '#5bdacc',
        'on-primary':              '#ffffff',
        'on-primary-container':    '#003a35',
        'on-primary-fixed':        '#00201d',
        'on-primary-fixed-variant':'#005049',
        'inverse-primary':         '#5bdacc',

        // ── Secondary (Amber) ─────────────────────────────────────────────
        secondary:                 '#8a5100',
        'secondary-container':     '#fea94b',   // Amber
        'secondary-fixed':         '#ffdcbd',
        'secondary-fixed-dim':     '#ffb86e',
        'on-secondary':            '#ffffff',
        'on-secondary-container':  '#6f4000',
        'on-secondary-fixed':      '#2c1600',
        'on-secondary-fixed-variant':'#693c00',

        // ── Tertiary (Brown/Warm) ─────────────────────────────────────────
        tertiary:                  '#6e5a4d',
        'tertiary-container':      '#ae9687',
        'tertiary-fixed':          '#f9ddcc',
        'tertiary-fixed-dim':      '#dbc2b1',
        'on-tertiary':             '#ffffff',
        'on-tertiary-container':   '#3f2f23',
        'on-tertiary-fixed':       '#26190e',
        'on-tertiary-fixed-variant':'#554336',

        // ── Semantic ──────────────────────────────────────────────────────
        error:                     '#ba1a1a',
        'error-container':         '#ffdad6',
        'on-error':                '#ffffff',
        'on-error-container':      '#93000a',

        // ── Text & Outline ────────────────────────────────────────────────
        'on-background':           '#1c1c18',
        'on-surface':              '#1c1c18',   // Ink
        'on-surface-variant':      '#3c4947',
        outline:                   '#6c7a77',
        'outline-variant':         '#bbc9c6',
        'inverse-surface':         '#31302d',
        'inverse-on-surface':      '#f4f0ea',

        // ── Petovia Custom Aliases ────────────────────────────────────────
        cream:        '#fdf9f3',
        ink:          '#1A1A1A',
        'teal-deep':  '#138A80',
        'teal-soft':  '#E8F8F6',
        amber:        '#E8973A',
        'amber-soft': '#FDF1E2',
        'brown-dark': '#1F1208',
        gold:         '#F0C87A',
        border:       '#EEE8DD',
      },

      borderRadius: {
        DEFAULT: '1rem',     // 16px — cards
        sm:      '0.5rem',   // 8px
        md:      '0.75rem',  // 12px  — photo corners
        lg:      '1.5rem',   // 24px — containers
        xl:      '2rem',     // 32px
        '2xl':   '3rem',     // 48px
        full:    '9999px',   // pills & badges
      },

      fontFamily: {
        sans:     ['Arial', 'Helvetica', 'sans-serif'],
        headline: ['Arial', 'Helvetica', 'sans-serif'],
        body:     ['Arial', 'Helvetica', 'sans-serif'],
        label:    ['Arial', 'Helvetica', 'sans-serif'],
      },

      fontSize: {
        'display-lg': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '800' }],
        'display-md': ['2.5rem', { lineHeight: '1.15', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-sm': ['2rem',   { lineHeight: '1.2',  letterSpacing: '-0.01em', fontWeight: '700' }],
        'headline-lg':['1.5rem', { lineHeight: '1.3',  letterSpacing: '-0.01em', fontWeight: '700' }],
        'headline-md':['1.25rem',{ lineHeight: '1.35', fontWeight: '600' }],
        'headline-sm':['1.125rem',{ lineHeight: '1.4', fontWeight: '600' }],
        'body-lg':    ['1rem',   { lineHeight: '1.6',  fontWeight: '400' }],
        'body-md':    ['0.875rem',{ lineHeight: '1.5', fontWeight: '400' }],
        'label-lg':   ['0.875rem',{ lineHeight: '1.4', fontWeight: '500' }],
        'label-md':   ['0.75rem', { lineHeight: '1.3', fontWeight: '500' }],
      },

      boxShadow: {
        // Teal-tinted ambient shadows — NEVER grey
        'teal-xs':  '0 2px 8px rgba(26,173,160,0.06)',
        'teal-sm':  '0 4px 16px rgba(26,173,160,0.08)',
        'teal-md':  '0 8px 24px rgba(26,173,160,0.10)',
        'teal-lg':  '0 12px 32px rgba(26,173,160,0.12)',
        'teal-xl':  '0 20px 48px rgba(26,173,160,0.14)',
        'teal-card':'0 4px 16px rgba(26,173,160,0.08)',
        'teal-lift':'0 12px 32px rgba(26,173,160,0.16)',  // hover state
        'teal-float':'0 12px 32px rgba(26,173,160,0.06)', // featured cards
      },

      backdropBlur: {
        nav: '20px',
      },

      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '88': '22rem',
        '100': '25rem',
        '112': '28rem',
        '128': '32rem',
      },

      keyframes: {
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'fade-in-up': {
          '0%':   { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'teal-glow': {
          '0%':   { boxShadow: '0 0 0 0 rgba(26,173,160,0.4)' },
          '70%':  { boxShadow: '0 0 0 8px rgba(26,173,160,0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(26,173,160,0)' },
        },
        'dot-bounce': {
          '0%, 80%, 100%': { transform: 'scale(0)', opacity: '0.3' },
          '40%':            { transform: 'scale(1)', opacity: '1' },
        },
        'heart-pop': {
          '0%':   { transform: 'scale(1)' },
          '50%':  { transform: 'scale(1.3)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      animation: {
        shimmer:      'shimmer 1.5s infinite linear',
        'fade-in-up': 'fade-in-up 0.3s ease-out forwards',
        'teal-glow':  'teal-glow 1.5s ease-out forwards',
        'dot-1':      'dot-bounce 1.2s infinite ease-in-out',
        'dot-2':      'dot-bounce 1.2s infinite ease-in-out 0.2s',
        'dot-3':      'dot-bounce 1.2s infinite ease-in-out 0.4s',
        'heart-pop':  'heart-pop 0.3s ease-out',
      },
    },
  },
  plugins: [],
}

export default config
