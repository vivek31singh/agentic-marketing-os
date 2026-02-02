/**
 * Design System Tokens
 * 
 * This file exports design tokens and a Tailwind theme configuration
 * that can be imported in tailwind.config.ts to apply consistent styling
 * across the application.
 */

import { type Config } from 'tailwindcss';

// ====================
// Color Tokens
// ====================

const colors = {
  // Primary brand color (blue/indigo based)
  primary: {
    50: '#eef2ff',
    100: '#e0e7ff',
    200: '#c7d2fe',
    300: '#a5b4fc',
    400: '#818cf8',
    500: '#6366f1',
    600: '#4f46e5',
    700: '#4338ca',
    800: '#3730a3',
    900: '#312e81',
    950: '#1e1b4b',
  },
  // Secondary brand color (purple/violet based)
  secondary: {
    50: '#faf5ff',
    100: '#f3e8ff',
    200: '#e9d5ff',
    300: '#d8b4fe',
    400: '#c084fc',
    500: '#a855f7',
    600: '#9333ea',
    700: '#7e22ce',
    800: '#6b21a8',
    900: '#581c87',
    950: '#3b0764',
  },
  // Success state color (emerald/green based)
  success: {
    50: '#ecfdf5',
    100: '#d1fae5',
    200: '#a7f3d0',
    300: '#6ee7b7',
    400: '#34d399',
    500: '#10b981',
    600: '#059669',
    700: '#047857',
    800: '#065f46',
    900: '#064e3b',
    950: '#022c22',
  },
  // Warning state color (amber based)
  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
    950: '#451a03',
  },
  // Danger/error state color (red based)
  danger: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
    950: '#450a0a',
  },
  // Neutral/slate palette for backgrounds, text, borders
  neutral: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
    950: '#020617',
  },
  // Discord-like dark backgrounds
  discord: {
    dark: '#1e1f22',
    darker: '#111214',
    light: '#2b2d31',
    lighter: '#383a40',
  },
};

// ====================
// Typography Tokens
// ====================

const fontFamily = {
  sans: [
    'var(--font-inter)',
    '-apple-system',
    'BlinkMacSystemFont',
    'Segoe UI',
    'Roboto',
    'Helvetica Neue',
    'Arial',
    'sans-serif',
  ],
  mono: [
    'var(--font-jetbrains-mono)',
    'ui-monospace',
    'SFMono-Regular',
    'Menlo',
    'Monaco',
    'Consolas',
    'monospace',
  ],
};

const fontSize = {
  xs: ['0.75rem', { lineHeight: '1rem', letterSpacing: '0.025em' }],
  sm: ['0.875rem', { lineHeight: '1.25rem', letterSpacing: '0.025em' }],
  base: ['1rem', { lineHeight: '1.5rem', letterSpacing: '0em' }],
  lg: ['1.125rem', { lineHeight: '1.75rem', letterSpacing: '-0.025em' }],
  xl: ['1.25rem', { lineHeight: '1.75rem', letterSpacing: '-0.025em' }],
  '2xl': ['1.5rem', { lineHeight: '2rem', letterSpacing: '-0.025em' }],
  '3xl': ['1.875rem', { lineHeight: '2.25rem', letterSpacing: '-0.025em' }],
  '4xl': ['2.25rem', { lineHeight: '2.5rem', letterSpacing: '-0.025em' }],
};

const fontWeight = {
  light: '300',
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
};

// ====================
// Spacing Tokens
// ====================

const spacing = {
  0: '0',
  1: '0.25rem',   // 4px
  2: '0.5rem',    // 8px
  3: '0.75rem',   // 12px
  4: '1rem',      // 16px
  5: '1.25rem',   // 20px
  6: '1.5rem',    // 24px
  8: '2rem',      // 32px
  10: '2.5rem',   // 40px
  12: '3rem',     // 48px
  16: '4rem',     // 64px
  20: '5rem',     // 80px
  24: '6rem',     // 96px
  32: '8rem',     // 128px
  40: '10rem',    // 160px
  48: '12rem',    // 192px
  56: '14rem',    // 224px
  64: '16rem',    // 256px
};

// ====================
// Border Radius Tokens
// ====================

const borderRadius = {
  none: '0',
  sm: '0.125rem',   // 2px
  DEFAULT: '0.25rem', // 4px
  md: '0.375rem',   // 6px
  lg: '0.5rem',     // 8px
  xl: '0.75rem',    // 12px
  '2xl': '1rem',    // 16px
  '3xl': '1.5rem',  // 24px
  full: '9999px',
};

// ====================
// Shadow Tokens
// ====================

const boxShadow = {
  xs: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  sm: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
  glow: '0 0 20px rgb(99 102 241 / 0.5)',
};

// ====================
// Animation Tokens
// ====================

const animation = {
  'fade-in': 'fadeIn 0.2s ease-in-out',
  'fade-out': 'fadeOut 0.2s ease-in-out',
  'slide-in-from-top': 'slideInFromTop 0.3s ease-out',
  'slide-in-from-bottom': 'slideInFromBottom 0.3s ease-out',
  'slide-in-from-left': 'slideInFromLeft 0.3s ease-out',
  'slide-in-from-right': 'slideInFromRight 0.3s ease-out',
  'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
  'spin-slow': 'spin 3s linear infinite',
};

const keyframes = {
  fadeIn: {
    '0%': { opacity: '0' },
    '100%': { opacity: '1' },
  },
  fadeOut: {
    '0%': { opacity: '1' },
    '100%': { opacity: '0' },
  },
  slideInFromTop: {
    '0%': { transform: 'translateY(-100%)', opacity: '0' },
    '100%': { transform: 'translateY(0)', opacity: '1' },
  },
  slideInFromBottom: {
    '0%': { transform: 'translateY(100%)', opacity: '0' },
    '100%': { transform: 'translateY(0)', opacity: '1' },
  },
  slideInFromLeft: {
    '0%': { transform: 'translateX(-100%)', opacity: '0' },
    '100%': { transform: 'translateX(0)', opacity: '1' },
  },
  slideInFromRight: {
    '0%': { transform: 'translateX(100%)', opacity: '0' },
    '100%': { transform: 'translateX(0)', opacity: '1' },
  },
};

// ====================
// Extend Theme
// ====================

const extend = {
  colors,
  fontFamily,
  fontSize,
  fontWeight,
  spacing,
  borderRadius,
  boxShadow,
  animation,
  keyframes,
  // Additional custom properties
  backgroundImage: {
    'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
    'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
  },
  transitionProperty: {
    'height': 'height',
    'spacing': 'margin, padding',
  },
};

// ====================
// Tailwind Theme Config
// ====================
/**
 * Exported Tailwind theme configuration
 * Import this in tailwind.config.ts to apply design tokens
 * 
 * Example usage in tailwind.config.ts:
 * ```ts
 * import type { Config } from 'tailwindcss'
 * import { tailwindThemeConfig } from '@/lib/theme'
 * 
 * const config: Config = {
 *   content: [...],
 *   theme: {
 *     extend: tailwindThemeConfig
 *   },
 *   plugins: [...]
 * }
 * ```
 */
export const tailwindThemeConfig = {
  extend,
};

// ====================
// Individual Token Exports
// ====================
/**
 * Individual design token exports for use in components
 * e.g., `colors.primary[500]` or `spacing[4]`
 */
export const designTokens = {
  colors,
  fontFamily,
  fontSize,
  fontWeight,
  spacing,
  borderRadius,
  boxShadow,
  animation,
  keyframes,
};

// Re-export commonly used tokens for convenience
export const {
  colors: themeColors,
  fontFamily: themeFontFamily,
  fontSize: themeFontSize,
  fontWeight: themeFontWeight,
  spacing: themeSpacing,
  borderRadius: themeBorderRadius,
  boxShadow: themeBoxShadow,
} = designTokens;

// Type exports for TypeScript
export type ThemeColors = typeof colors;
export type ThemeSpacing = typeof spacing;
export type ThemeBorderRadius = typeof borderRadius;
export type ThemeBoxShadow = typeof boxShadow;
