/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      colors: {
        rausch:   '#ff385c',
        magenta:  '#92174d',
        luxe:     '#460479',
        ink:      '#222222',
        ash:      '#6a6a6a',
        hairline: '#dddddd',
        cloud:    '#f7f7f7',
        canvas:   '#ffffff',
        error:    '#c13515',
        info:     '#428bff',
        success:  '#2d6a4f',
        amber:    '#a07000',
      },
      borderRadius: {
        sm:   '4px',
        md:   '8px',
        lg:   '12px',
        xl:   '16px',
        '2xl':'20px',
        '3xl':'24px',
      },
      boxShadow: {
        card:       '0 0 0 1px rgba(0,0,0,0.02), 0 2px 6px rgba(0,0,0,0.04), 0 4px 8px rgba(0,0,0,0.10)',
        'card-hover':'0 8px 32px rgba(0,0,0,0.08)',
        auth:       '0 24px 64px rgba(0,0,0,0.45)',
        fab:        '0 2px 8px rgba(255,56,92,0.4)',
      },
    },
  },
  plugins: [],
}
