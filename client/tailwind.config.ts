/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");
const { default: flattenColorPalette } = require("tailwindcss/lib/util/flattenColorPalette");

module.exports = {
	content: [
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/**/*.{js,ts,jsx,tsx,mdx,ts,tsx}",
	],
	darkMode: ["class", "media"], // Enable dark mode by default (can use "media" for OS preference)
	theme: {
    	extend: {
    		fontFamily: {
    			chillax: ['Chillax', 'sans-serif'],
    			satoshi: ['Satoshi', 'sans-serif']
    		},
    		borderRadius: {
    			lg: 'var(--radius)',
    			md: 'calc(var(--radius) - 2px)',
    			sm: 'calc(var(--radius) - 4px)'
    		},
    		colors: {
    			background: 'hsl(var(--background-dark, 210 25% 10%))',
    			foreground: 'hsl(var(--foreground-dark, 210 50% 95%))',
    			'color-one': 'hsl(260 80% 60%)',
    			faqPurple: '#ad28eb',
    			faqLightPink: 'hsl(275, 100%, 97%)',
    			faqGrayishPurple: 'hsl(292, 16%, 49%)',
    			faqDarkPurple: 'hsl(292, 42%, 14%)',
    			card: {
    				DEFAULT: 'hsl(var(--card-dark, 210 25% 15%))',
    				foreground: 'hsl(var(--card-foreground-dark, 210 20% 95%))'
    			},
    			popover: {
    				DEFAULT: 'hsl(var(--popover-dark, 210 30% 12%))',
    				foreground: 'hsl(var(--popover-foreground-dark, 210 20% 95%))'
    			},
    			primary: {
    				DEFAULT: 'hsl(var(--primary-dark, 260 80% 60%))',
    				foreground: 'hsl(var(--primary-foreground-dark, 210 20% 95%))'
    			},
    			secondary: {
    				DEFAULT: 'hsl(var(--secondary-dark, 280 70% 50%))',
    				foreground: 'hsl(var(--secondary-foreground-dark, 210 20% 95%))'
    			},
    			muted: {
    				DEFAULT: 'hsl(var(--muted-dark, 210 20% 25%))',
    				foreground: 'hsl(var(--muted-foreground-dark, 210 20% 75%))'
    			},
    			accent: {
    				DEFAULT: 'hsl(var(--accent-dark, 340 70% 50%))',
    				foreground: 'hsl(var(--accent-foreground-dark, 210 20% 95%))'
    			},
    			destructive: {
    				DEFAULT: 'hsl(var(--destructive-dark, 0 70% 50%))',
    				foreground: 'hsl(var(--destructive-foreground-dark, 210 20% 95%))'
    			},
    			border: 'hsl(var(--border-dark, 210 20% 15%))',
    			input: 'hsl(var(--input-dark, 210 20% 15%))',
    			ring: 'hsl(var(--ring-dark, 210 40% 20%))',
    			chart: {
    				'1': 'hsl(var(--chart-1-dark, 340 70% 40%))',
    				'2': 'hsl(var(--chart-2-dark, 280 70% 50%))',
    				'3': 'hsl(var(--chart-3-dark, 220 70% 60%))',
    				'4': 'hsl(var(--chart-4-dark, 160 70% 50%))',
    				'5': 'hsl(var(--chart-5-dark, 60 70% 50%))'
    			}
    		},
    		animation: {
    			pulse: 'pulse var(--duration) ease-out infinite',
    			gradient: 'gradient 8s linear infinite',
    			spotlight: 'spotlight 2s ease .75s 1 forwards',
    			ripple: 'ripple var(--duration,2s) ease calc(var(--i, 0)*.2s) infinite'
    		},
    		keyframes: {
    			pulse: {
    				'0%, 100%': {
    					boxShadow: '0 0 0 0 var(--pulse-color)'
    				},
    				'50%': {
    					boxShadow: '0 0 0 8px var(--pulse-color)'
    				}
    			},
    			gradient: {
    				to: {
    					backgroundPosition: 'var(--bg-size) 0'
    				}
    			},
    			spotlight: {
    				'0%': {
    					opacity: '0',
    					transform: 'translate(-72%, -62%) scale(0.5)'
    				},
    				'100%': {
    					opacity: '1',
    					transform: 'translate(-50%,-40%) scale(1)'
    				}
    			},
    			ripple: {
    				'0%, 100%': {
    					transform: 'translate(-50%, -50%) scale(1)'
    				},
    				'50%': {
    					transform: 'translate(-50%, -50%) scale(0.9)'
    				}
    			}
    		}
    	}
    },
	plugins: [
		addVariablesForColors,
		require("tailwindcss-animate"),
	],
};

// This plugin adds each Tailwind color as a global CSS variable, e.g., var(--gray-200).
function addVariablesForColors({ addBase, theme }: any) {
	const allColors = flattenColorPalette(theme("colors"));
	const newVars = Object.fromEntries(
		Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
	);

	addBase({
		":root": newVars,
	});
}