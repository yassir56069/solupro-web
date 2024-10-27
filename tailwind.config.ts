import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {

    colors: {
      // ---------------------: COLORS
      'white'            : '#FFFFFFFF',
      'grey'             : '#E9E9E906',
      'mobile-acc-blue'  : '#074A55',
      'main-acc-blue'    : '#035360',
      'tone-acc-blue'    : '#00A4BE',
      'main-acc-orange'  : '#EE9236',
      'tone-acc-orange'  : '#8F1100',

      // ---------------------: GRADIENTS
      'gr-top-blue'      : '#00A4BE',
      'gr-btm-blue'      : '#083E47',
      'gr-top-orange'    : 'main-acc-orange',
      'gr-btm-orange'    : 'tone-acc-orange'
    },

    extend: {
      fontFamily: {
        creatoDisplay: ['var(--font-creato-display)'],
        edgeCutting: ['var(--font-edgecutting)'],
      },
    },
  },
  plugins: [],
} satisfies Config;