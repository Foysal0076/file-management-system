/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
        },
      },
      fontFamily: {
        OpenSans: ['var(--font-open-sans)'],
      },
      boxShadow: {
        xs: 'var(--shadow-xs-box-shadow)',
        sm: 'var(--shadow-sm-box-shadow)',
        md: 'var(--shadow-md-box-shadow)',
        lg: 'var(--shadow-lg-box-shadow)',
        xl: 'var(--shadow-xl-box-shadow)',
        '2xl': 'var(--shadow-2-xl-box-shadow)',
        '3xl': 'var(--shadow-3-xl-box-shadow)',
      },
      blur: {
        sm: 'var(--backgroundblur-sm-backdrop-filter)',
        md: 'var(--backgroundblur-md-backdrop-filter)',
        lg: 'var(--backgroundblur-lg-backdrop-filter)',
        xl: 'var(--backgroundblur-xl-backdrop-filter)',
      },
      backgroundImage: {
        'chevron-down': 'url(/assets/images/chevron-down.svg)',
      },
      backgroundPosition: {
        'left-2': 'left .5rem center',
        'left-4': 'left 1rem center',
        'left-6': 'left 1.5rem center',
        'left-8': 'left 2rem center',
        'right-2': 'right .5rem center',
        'right-4': 'right 1rem center',
        'right-6': 'right 1.5rem center',
        'right-8': 'right 2rem center',
      },
    },
    fontSize: {
      xxs: [
        '0.625rem',
        {
          lineHeight: '1.125rem',
        },
      ],
      xs: [
        '0.75rem',
        {
          lineHeight: '1.125rem',
        },
      ],
      sm: [
        '0.875rem',
        {
          lineHeight: '1.25rem',
        },
      ],
      md: [
        '1rem',
        {
          lineHeight: '1.5rem',
        },
      ],
      lg: [
        '1.125rem',
        {
          lineHeight: '1.75rem',
        },
      ],
      xl: [
        '1.25rem',
        {
          lineHeight: '1.875rem',
        },
      ],

      'display-xs': [
        '1.5rem',
        {
          lineHeight: '2rem',
        },
      ],

      'display-sm': [
        '1.875rem',
        {
          lineHeight: '2.375rem',
        },
      ],

      'display-md': [
        '2rem',
        {
          lineHeight: '2.75rem',
          letterSpacing: '-0.045rem',
        },
      ],
      'display-lg': [
        '3rem',
        {
          lineHeight: '3.75rem',
          letterSpacing: '-0.06rem',
        },
      ],
      'display-xl': [
        '3.75rem',
        {
          lineHeight: '4.5rem',
          letterSpacing: '-0.075rem',
        },
      ],
      'display-2xl': [
        '4.5rem',
        {
          lineHeight: '5.625rem',
          letterSpacing: '-0.09rem',
        },
      ],
    },
    colors: {
      primary: {
        50: 'rgb(var(--colors-primary-primary-50) / <alpha-value>)',
        100: 'rgb(var(--colors-primary-primary-100) / <alpha-value>)',
        200: 'rgb(var(--colors-primary-primary-200) / <alpha-value>)',
        300: 'rgb(var(--colors-primary-primary-300) / <alpha-value>)',
        400: 'rgb(var(--colors-primary-primary-400) / <alpha-value>)',
        500: 'rgb(var(--colors-primary-primary-500) / <alpha-value>)',
        600: 'rgb(var(--colors-primary-primary-600) / <alpha-value>)',
        700: 'rgb(var(--colors-primary-primary-700) / <alpha-value>)',
        800: 'rgb(var(--colors-primary-primary-800) / <alpha-value>)',
        900: 'rgb(var(--colors-primary-primary-900) / <alpha-value>)',
      },
      secondary: {
        50: 'rgb(var(--colors-secondary-secondary-50) / <alpha-value>)',
        100: 'rgb(var(--colors-secondary-secondary-100) / <alpha-value>)',
        200: 'rgb(var(--colors-secondary-secondary-200) / <alpha-value>)',
        300: 'rgb(var(--colors-secondary-secondary-300) / <alpha-value>)',
        400: 'rgb(var(--colors-secondary-secondary-400) / <alpha-value>)',
        500: 'rgb(var(--colors-secondary-secondary-500) / <alpha-value>)',
        600: 'rgb(var(--colors-secondary-secondary-600) / <alpha-value>)',
        700: 'rgb(var(--colors-secondary-secondary-700) / <alpha-value>)',
        800: 'rgb(var(--colors-secondary-secondary-800) / <alpha-value>)',
        900: 'rgb(var(--colors-secondary-secondary-900) / <alpha-value>)',
      },
      tertiary: {
        50: 'rgb(var(--colors-tertiary-tertiary-50) / <alpha-value>)',
        100: 'rgb(var(--colors-tertiary-tertiary-100) / <alpha-value>)',
        200: 'rgb(var(--colors-tertiary-tertiary-200) / <alpha-value>)',
        300: 'rgb(var(--colors-tertiary-tertiary-300) / <alpha-value>)',
        400: 'rgb(var(--colors-tertiary-tertiary-400) / <alpha-value>)',
        500: 'rgb(var(--colors-tertiary-tertiary-500) / <alpha-value>)',
        600: 'rgb(var(--colors-tertiary-tertiary-600) / <alpha-value>)',
        700: 'rgb(var(--colors-tertiary-tertiary-700) / <alpha-value>)',
        800: 'rgb(var(--colors-tertiary-tertiary-800) / <alpha-value>)',
        900: 'rgb(var(--colors-tertiary-tertiary-900) / <alpha-value>)',
      },
      neutral: {
        0: 'rgb(var(--colors-neutral-n-0) / <alpha-value>)',
        10: 'rgb(var(--colors-neutral-n-10) / <alpha-value>)',
        20: 'rgb(var(--colors-neutral-n-20) / <alpha-value>)',
        30: 'rgb(var(--colors-neutral-n-30) / <alpha-value>)',
        40: 'rgb(var(--colors-neutral-n-40) / <alpha-value>)',
        50: 'rgb(var(--colors-neutral-n-50) / <alpha-value>)',
        60: 'rgb(var(--colors-neutral-n-60) / <alpha-value>)',
        70: 'rgb(var(--colors-neutral-n-70) / <alpha-value>)',
        80: 'rgb(var(--colors-neutral-n-80) / <alpha-value>)',
        90: 'rgb(var(--colors-neutral-n-90) / <alpha-value>)',
        100: 'rgb(var(--colors-neutral-n-100) / <alpha-value>)',
        200: 'rgb(var(--colors-neutral-n-200) / <alpha-value>)',
        300: 'rgb(var(--colors-neutral-n-300) / <alpha-value>)',
        400: 'rgb(var(--colors-neutral-n-400) / <alpha-value>)',
        500: 'rgb(var(--colors-neutral-n-500) / <alpha-value>)',
        600: 'rgb(var(--colors-neutral-n-600) / <alpha-value>)',
        700: 'rgb(var(--colors-neutral-n-700) / <alpha-value>)',
        800: 'rgb(var(--colors-neutral-n-800) / <alpha-value>)',
        900: 'rgb(var(--colors-neutral-n-900) / <alpha-value>)',
      },
      info: {
        50: 'rgb(var(--colors-info-info-50) / <alpha-value>)',
        100: 'rgb(var(--colors-info-info-100) / <alpha-value>)',
        200: 'rgb(var(--colors-info-info-200) / <alpha-value>)',
        300: 'rgb(var(--colors-info-info-300) / <alpha-value>)',
        400: 'rgb(var(--colors-info-info-400) / <alpha-value>)',
        500: 'rgb(var(--colors-info-info-500) / <alpha-value>)',
        600: 'rgb(var(--colors-info-info-600) / <alpha-value>)',
        700: 'rgb(var(--colors-info-info-700) / <alpha-value>)',
        800: 'rgb(var(--colors-info-info-800) / <alpha-value>)',
        900: 'rgb(var(--colors-info-info-900) / <alpha-value>)',
      },
      success: {
        50: 'rgb(var(--colors-success-success-50) / <alpha-value>)',
        100: 'rgb(var(--colors-success-success-100) / <alpha-value>)',
        200: 'rgb(var(--colors-success-success-200) / <alpha-value>)',
        300: 'rgb(var(--colors-success-success-300) / <alpha-value>)',
        400: 'rgb(var(--colors-success-success-400) / <alpha-value>)',
        500: 'rgb(var(--colors-success-success-500) / <alpha-value>)',
        600: 'rgb(var(--colors-success-success-600) / <alpha-value>)',
        700: 'rgb(var(--colors-success-success-700) / <alpha-value>)',
        800: 'rgb(var(--colors-success-success-800) / <alpha-value>)',
        900: 'rgb(var(--colors-success-success-900) / <alpha-value>)',
      },
      danger: {
        50: 'rgb(var(--colors-danger-danger-50) / <alpha-value>)',
        100: 'rgb(var(--colors-danger-danger-100) / <alpha-value>)',
        200: 'rgb(var(--colors-danger-danger-200) / <alpha-value>)',
        300: 'rgb(var(--colors-danger-danger-300) / <alpha-value>)',
        400: 'rgb(var(--colors-danger-danger-400) / <alpha-value>)',
        500: 'rgb(var(--colors-danger-danger-500) / <alpha-value>)',
        600: 'rgb(var(--colors-danger-danger-600) / <alpha-value>)',
        700: 'rgb(var(--colors-danger-danger-700) / <alpha-value>)',
        800: 'rgb(var(--colors-danger-danger-800) / <alpha-value>)',
        900: 'rgb(var(--colors-danger-danger-900) / <alpha-value>)',
      },
      warning: {
        50: 'rgb(var(--colors-warning-warning-50) / <alpha-value>)',
        100: 'rgb(var(--colors-warning-warning-100) / <alpha-value>)',
        200: 'rgb(var(--colors-warning-warning-200) / <alpha-value>)',
        300: 'rgb(var(--colors-warning-warning-300) / <alpha-value>)',
        400: 'rgb(var(--colors-warning-warning-400) / <alpha-value>)',
        500: 'rgb(var(--colors-warning-warning-500) / <alpha-value>)',
        600: 'rgb(var(--colors-warning-warning-600) / <alpha-value>)',
        700: 'rgb(var(--colors-warning-warning-700) / <alpha-value>)',
        800: 'rgb(var(--colors-warning-warning-800) / <alpha-value>)',
        900: 'rgb(var(--colors-warning-warning-900) / <alpha-value>)',
      },
    },
    boxShadow: {
      xs: 'var(--shadow-xs-box-shadow)',
      sm: 'var(--shadow-sm-box-shadow)',
      md: 'var(--shadow-md-box-shadow)',
      lg: 'var(--shadow-lg-box-shadow)',
      xl: 'var(--shadow-xl-box-shadow)',
      '2xl': 'var(--shadow-2-xl-box-shadow)',
      '3xl': 'var(--shadow-3-xl-box-shadow)',
      'right-box': 'var(--right-box-shadow)',
      up: 'var(--up-box-shadow)',
    },
    blur: {
      sm: 'var(--backgroundblur-sm-backdrop-filter)',
      md: 'var(--backgroundblur-md-backdrop-filter)',
      lg: 'var(--backgroundblur-lg-backdrop-filter)',
      xl: 'var(--backgroundblur-xl-backdrop-filter)',
    },
    backgroundImage: {
      'chevron-down': 'url(/assets/images/chevron-down.svg)',
    },
    backgroundPosition: {
      'left-2': 'left .5rem center',
      'left-4': 'left 1rem center',
      'left-6': 'left 1.5rem center',
      'left-8': 'left 2rem center',
      'right-2': 'right .5rem center',
      'right-4': 'right 1rem center',
      'right-6': 'right 1.5rem center',
      'right-8': 'right 2rem center',
    },
    listStyleType: {
      none: 'none',
      disc: 'disc',
      decimal: 'decimal',
      square: 'square',
      roman: 'upper-roman',
      alpha: 'lower-alpha',
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/container-queries'),
  ],
}
