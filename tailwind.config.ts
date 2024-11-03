import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {

    colors: {
      // ---------------------: COLORS
      'transparent'           : '#FFFFFF00',
      'white'                 : '#FFFFFFFF',
      'grey'                  : '#D4D4D4FF',
      'blck'                  : '#000000FF',
      'darker'                : '#00000006',
      'even-darker'           : '#00000013',
      'unselected'            : '#9A9A9ABC',
      'unselected-trans'      : '#DFDCDC5A',
      'mobile-acc-blue'       : '#074A55',
      'main-acc-blue'         : '#035360',
      'tone-acc-blue'         : '#00A4BE',
      'main-acc-orange'       : '#EE9236',
      'lite-tone-acc-orange'  : '#F5C35EFF',
      'tone-acc-orange'       : '#8F1100',

      // ---------------------: GRADIENTS
      'gr-top-blue'           : '#00A4BE',
      'gr-btm-blue'           : '#083E47',
      'gr-top-orange'         : 'main-acc-orange',
      'gr-btm-orange'         : 'tone-acc-orange'
    },

    extend: {
      fontFamily: {
        creatoDisplay   : ['var(--font-creato-display)'],
        edgeCutting     : ['var(--font-edgecutting)'],
      },

      screens: {
        'sm'            : '640px',
        'md'            : '900px', 
        'lg'            : '1024px',
        'xl'            : '1280px',
        '2xl'           : '1536px',
      },

      backgroundSize: {
        'size-200'      : '200% 200%',
      },

      backgroundPosition: {
        'pos-0'         : '0% 0%',
        'pos-100'       : '100% 100%',
      },
    },
  },
  plugins: [],
} satisfies Config;