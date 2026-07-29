/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'brand-black': '#080808',
        'brand-white': '#fafafa',
        'brand-gray': '#151515',
        'brand-accent': '#E63946',
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        body: ['DM Sans', 'sans-serif'],
      },
      backgroundColor: {
        'primary': 'var(--bg-primary)',
        'secondary': 'var(--bg-secondary)',
        'tertiary': 'var(--bg-tertiary)',
        'card': 'var(--bg-card)',
        'hover': 'var(--bg-hover)',
      },
      textColor: {
        'primary': 'var(--text-primary)',
        'secondary': 'var(--text-secondary)',
        'tertiary': 'var(--text-tertiary)',
        'quaternary': 'var(--text-quaternary)',
      },
      borderColor: {
        'subtle': 'var(--border-subtle)',
        'light': 'var(--border-light)',
        'medium': 'var(--border-medium)',
      },
    },
  },
  plugins: [],
}
