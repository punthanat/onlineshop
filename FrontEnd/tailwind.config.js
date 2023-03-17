const colors = require('tailwindcss/colors')
module.exports = {
  purge: { content: ['./public/**/*.html', './src/**/*.vue'] },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        redpastel :{ 
       dark :   '#d62828',
       DEFAULT :'#f94144',
      },

        greenpastel : {
          dark : '#4d908e',
          DEFAULT : '#43aa8b'
      
      
      },
      }
    }
  },

  variants: {
    extend: {},
  },
  plugins: [],
}
