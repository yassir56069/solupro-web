import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
    darkMode: ["class"],
    content: ["./src/**/*.tsx"],
  theme: {
  	colors: {
  		transparent: '#FFFFFF00',
  		white: '#FFFFFFFF',
  		grey: '#D4D4D4FF',
  		blck: '#000000FF',
  		darker: '#00000006',
  		'even-darker': '#00000013',
  		unselected: '#9A9A9ABC',
  		'unselected-trans': '#DFDCDC5A',
  		error: '#EFAAAAFF',
  		'error-box': '#4646466D',
  		'mobile-acc-blue': '#074A55',
  		'main-acc-blue': '#035360',
  		'tone-acc-blue': '#00A4BE',
  		'main-acc-orange': '#EE9236',
  		'lite-tone-acc-orange': '#F5C35EFF',
  		'tone-acc-orange': '#8F1100',
  		'gr-top-blue': '#00A4BE',
  		'gr-btm-blue': '#083E47',
  		'gr-top-orange': 'main-acc-orange',
  		'gr-btm-orange': 'tone-acc-orange'
  	},
  	extend: {
  		fontFamily: {
  			creatoDisplay: [
  				'var(--font-creato-display)'
  			],
  			edgeCutting: [
  				'var(--font-edgecutting)'
  			]
  		},
  		screens: {
  			sm: '640px',
  			md: '900px',
  			lg: '1024px',
  			xl: '1280px',
  			'2xl': '1536px'
  		},
  		backgroundSize: {
  			'size-200': '200% 200%'
  		},
  		backgroundPosition: {
  			'pos-0': '0% 0%',
  			'pos-100': '100% 100%'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;