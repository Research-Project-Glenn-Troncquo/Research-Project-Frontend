module.exports = {
  mode: 'jit',
  prefix: '',
  purge: {
    content: ['./src/**/*.{html,ts}'],
  },
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'p-orange': '#CB5931',
        'p-black': '#3C3D3D',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        '.container': {
          maxWidth: '100%',
          '@screen sm': {
            maxWidth: '600px',
          },
          '@screen md': {
            //768px
            maxWidth: '748px',
          },
          '@screen lg': {
            //1024px
            maxWidth: '1000px',
          },
          '@screen xl': {
            //1280px
            maxWidth: '1220px',
          },
        },
      })
    },
  ],
}
