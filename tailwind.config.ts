import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const token = (name: string) => `hsl(var(${name}) / <alpha-value>)`;

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: token('--border'),
				'border-strong': token('--border-strong'),
				input: token('--input'),
				ring: token('--ring'),
				background: token('--background'),
				foreground: token('--foreground'),
				primary: {
					DEFAULT: token('--primary'),
					foreground: token('--primary-foreground'),
					hover: token('--primary-hover'),
					active: token('--primary-active'),
					subtle: token('--primary-subtle'),
					'subtle-foreground': token('--primary-subtle-foreground'),
				},
				secondary: {
					DEFAULT: token('--secondary'),
					foreground: token('--secondary-foreground'),
					hover: token('--secondary-hover'),
				},
				destructive: {
					DEFAULT: token('--destructive'),
					foreground: token('--destructive-foreground'),
					subtle: token('--destructive-subtle'),
				},
				muted: {
					DEFAULT: token('--muted'),
					hover: token('--muted-hover'),
					foreground: token('--muted-foreground'),
				},
				accent: {
					DEFAULT: token('--accent'),
					hover: token('--accent-hover'),
					foreground: token('--accent-foreground'),
				},
				popover: {
					DEFAULT: token('--popover'),
					foreground: token('--popover-foreground'),
				},
				card: {
					DEFAULT: token('--card'),
					foreground: token('--card-foreground'),
				},
				whatsapp: {
					DEFAULT: token('--whatsapp'),
					foreground: token('--whatsapp-foreground'),
					hover: token('--whatsapp-hover'),
					soft: token('--whatsapp-soft'),
					'soft-foreground': token('--whatsapp-soft-foreground'),
					border: token('--whatsapp-border'),
				},
				surface: {
					sunken: token('--surface-sunken'),
					inverse: token('--surface-inverse'),
					'inverse-foreground': token('--surface-inverse-foreground'),
				},
				success: {
					subtle: token('--success-subtle'),
					'subtle-foreground': token('--success-subtle-foreground'),
				},
				warning: {
					subtle: token('--warning-subtle'),
					'subtle-foreground': token('--warning-subtle-foreground'),
				},
				sidebar: {
					DEFAULT: token('--surface-sunken'),
					foreground: token('--foreground'),
					primary: token('--primary'),
					'primary-foreground': token('--primary-foreground'),
					accent: token('--muted'),
					'accent-foreground': token('--foreground'),
					border: token('--border'),
					ring: token('--ring'),
				},
			},
			fontFamily: {
				sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
				display: ['Archivo', 'Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
			},
			fontSize: {
				'display-l': ['clamp(2.25rem, 5vw, 3.5rem)', { lineHeight: '1.06', letterSpacing: '-0.02em', fontWeight: '700' }],
				'display-s': ['clamp(1.875rem, 3.5vw, 2.75rem)', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
				'headline-l': ['2rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '600' }],
				'headline-s': ['1.375rem', { lineHeight: '1.3', letterSpacing: '-0.005em', fontWeight: '600' }],
				'body-l': ['1.125rem', { lineHeight: '1.6' }],
				'body-s': ['0.9375rem', { lineHeight: '1.55' }],
				label: ['0.875rem', { lineHeight: '1.4', fontWeight: '600', letterSpacing: '0.005em' }],
				eyebrow: ['0.8125rem', { lineHeight: '1.2', fontWeight: '600', letterSpacing: '0.08em' }],
			},
			spacing: {
				xs: '0.25rem',
				sm: '0.5rem',
				md: '1rem',
				lg: '1.5rem',
				xl: '2.5rem',
				'2xl': '4rem',
				section: 'clamp(3.5rem, 7vw, 6rem)',
			},
			borderRadius: {
				xs: '0.25rem',
				sm: '0.375rem',
				md: '0.625rem',
				lg: '0.875rem',
				xl: '1.25rem',
			},
			boxShadow: {
				xs: 'var(--shadow-xs)',
				sm: 'var(--shadow-sm)',
				md: 'var(--shadow-md)',
				lg: 'var(--shadow-lg)',
				fab: 'var(--shadow-fab)',
			},
			maxWidth: {
				content: '1280px',
				prose: '68ch',
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
			},
		}
	},
	plugins: [tailwindcssAnimate],
} satisfies Config;
