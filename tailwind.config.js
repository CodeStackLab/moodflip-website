/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'brand-ivory': '#FDF8F5',
        'brand-cream': '#FCF3E9',
        'brand-card': '#FEFAF8',
        'brand-tint': '#F4EBF5',
        'brand-selected': '#EEE0FC',
        'brand-inactive': '#F1ECED',
        'brand-border': '#E4DAD7',
        'brand-border-selected': '#7666AB',
        'brand-dark': '#1A143F',
        'brand-secondary': '#5C527A',
        'brand-muted': '#7E7096',
        'brand-grey': '#A49BA8',
        'brand-purple': '#7464AC',
        'brand-purple-dark': '#4F438B',
        'brand-purple-light': '#9C8CC4',
        'brand-peach': '#E49C8C',
        'brand-peach-warm': '#EDAA7A',
        'brand-sun': '#FDE8C8',
        'brand-sun-shadow': '#E9D3B3',
        'brand-sage': '#7D8164',
        'brand-sage-light': '#898B71',
        'brand-footer': '#FAF5F6',
      },
      fontFamily: {
        serif: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        display: ['Fraunces', 'Georgia', 'serif'],
        body: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 4px 20px rgba(26, 20, 63, 0.04)',
        'card': '0 10px 30px rgba(26, 20, 63, 0.05), 0 2px 8px rgba(0, 0, 0, 0.02)',
        'hover': '0 14px 38px rgba(26, 20, 63, 0.08), 0 4px 12px rgba(0, 0, 0, 0.03)',
        'button': '0 8px 22px rgba(79, 67, 139, 0.28)',
      },
    },
  },
  plugins: [],
};
