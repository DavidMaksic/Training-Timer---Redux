/** @type {import('tailwindcss').Config} */
export default {
   content: ['src/**/*.{html,js,jsx}'],
   theme: {
      extend: {
         boxShadow: {
            lime: '0 0 70px #d9f99d',
         },
         scale: {
            '-100': '-1',
         },
         colors: {
            yellowPaused: '#e29f0d',
            yellowTextPaused: '#ffcd37',
            violetPaused: '#9971f0',
            violetTextPaused: '#b3a5ec',
         },
      },
      screens: {
         '2xl': { max: '1535px' },
         xl: { max: '1279px' },
         lg: { max: '1023px' },
         md: { max: '767px' },
         sm: { max: '639px' },
      },
   },
   plugins: [],
};
