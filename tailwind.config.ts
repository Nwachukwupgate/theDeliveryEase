/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
  	extend: {
  		screens: {
  			xs: '340px',
  			xbs: '400px',
  			md: '766px',
  			lg: '1025px',
  			xlc: '1500px'
  		},
  		fontFamily: {
  			ezra: ['Ezra', 'sans-serif']
  		},
  		colors: {
  			primaryColor: 'var(--color-primary-main)',
  			primaryColorLight: 'var(--color-primary-light)',
  			primaryColorDark: 'var(--color-primary-dark)',
  			primaryColorDarker: 'var(--color-primary-darker)',
  			primaryTextHighlight: 'var(--color-primary-contrastText)',
  			primaryHoverColorLight: 'var(--color-primary-lightHover)',
  			primaryActiveColorLight: 'var(--color-primary-lightActive)',
  			primaryHoverColor: 'var(--color-primary-mainHover)',
  			primaryActiveColor: 'var(--color-primary-mainActive)',
  			primaryHoverColorDark: 'var(--color-primary-darkHover)',
  			primaryActiveColorDark: 'var(--color-primary-darkActive)',
  			successColor: 'var(--color-success-main)',
  			successColorLight: 'var(--color-success-light)',
  			successColorDark: 'var(--color-success-dark)',
  			successColorDarker: 'var(--color-success-darker)',
  			successTextHighlight: 'var(--color-success-contrastText)',
  			successHoverColorLight: 'var(--color-success-lightHover)',
  			successActiveColorLight: 'var(--color-success-lightActive)',
  			successHoverColor: 'var(--color-success-mainHover)',
  			successActiveColor: 'var(--color-success-mainActive)',
  			successHoverColorDark: 'var(--color-success-darkHover)',
  			successActiveColorDark: 'var(--color-success-darkActive)',
  			errorColor: 'var(--color-error-main)',
  			errorColorLight: 'var(--color-error-light)',
  			errorColorDark: 'var(--color-error-dark)',
  			errorColorDarker: 'var(--color-error-darker)',
  			errorTextHighlight: 'var(--color-error-contrastText)',
  			errorHoverColorLight: 'var(--color-error-lightHover)',
  			errorActiveColorLight: 'var(--color-error-lightActive)',
  			errorHoverColor: 'var(--color-error-mainHover)',
  			errorActiveColor: 'var(--color-error-mainActive)',
  			errorHoverColorDark: 'var(--color-error-darkHover)',
  			errorActiveColorDark: 'var(--color-error-darkActive)',
  			appBlue100: '#008CDB',
  			appGray: '#F6F6F7',
  			appGray100: '#797979',
  			appGray200: '#595959',
  			appGray300: '#DFDFDF',
  			appGray400: '#B0B0B0',
  			appGray500: '#535353',
  			appWhite100: '#FEFEFE',
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
  		},
  		boxShadow: {
  			checkBox: '0px 1px 3px 0px #E2E2E2 inset'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
