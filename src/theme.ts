// Central theme constants and small helpers for Geopulse UI
export const THEME = {
  colors: {
    comicBg: '#fff8c4',
    darkBorder: '#2b2b2b',
    primaryButton: '#2b2b2b',
    primaryAccent: '#0b1220',
    adminAccent: '#e0e7ff', // Light indigo for admin surfaces
    logoAccent: '#0ea5e9',  // Logo Teal/Sky
    logoAccentSoft: '#e0f2fe', // Logo Light Sky
    inputBorder: 'rgba(43,43,43,0.12)',
    text: '#0b1220',
  },

  classes: {
    card: 'rounded-2xl p-6 shadow-lg',
    input: 'mt-1 w-full px-4 py-3 rounded-lg bg-white',
    primaryButton: 'inline-flex items-center justify-center w-36 gap-2 px-4 py-2 rounded-full font-extrabold',
  },

  styles: {
    card: { background: '#fff', border: '1px solid rgba(43,43,43,0.2)' }, // Softened and thinned
    cardHero: { background: '#fff8c4', border: '2px solid #2b2b2b' }, // Hero cards are slightly bolder but still reduced
    input: { border: '1px dashed rgba(43,43,43,0.3)' },
    primaryButton: { background: '#2b2b2b', color: '#fff', border: '3px solid #0b1220' },
  },
} as const

export const inputClass = THEME.classes.input
export const inputStyle = THEME.styles.input

export const cardClass = THEME.classes.card
export const cardStyle = THEME.styles.card

export const primaryButtonClass = THEME.classes.primaryButton
export const primaryButtonStyle = THEME.styles.primaryButton

export default THEME
