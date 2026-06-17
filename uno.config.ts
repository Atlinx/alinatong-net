import { defineConfig, presetWind4 } from 'unocss'

export default defineConfig({
    presets: [
        presetWind4({
            preflights: {
                reset: false,
            },
        }),
    ],
    theme: {
        breakpoints: {
            xs: '30rem',
        },
        font: {
            'league-gothic': '"League Gothic", "sans-serif"',
            ubuntu: '"Ubuntu Sans", "sans-serif"',
        },
        colors: {
            pink: {
                50: '#fff0f3',
                100: '#ffe4ea',
                200: '#ffc9d6',
                300: '#ffadc2',
                400: '#ff89ab',
                500: '#ff6798',
                600: '#ed0074',
                700: '#b60058',
                800: '#7e003b',
                900: '#4a0020',
                950: '#300012',
            },
            grey: {
                50: '#f0f0f4',
                100: '#e4e5ec',
                200: '#c9cbd9',
                300: '#aeb2c7',
                400: '#949ab5',
                500: '#7b82a3',
                600: '#646c8c',
                700: '#505671',
                800: '#3c4156',
                900: '#282b3b',
                950: '#202330',
            },
            primary: '#ed0074',
            secondary: {
                100: '#e6e6e6',
                150: '#d6d6d6',
                200: '#bbbbbb',
                300: '#75757a',
                400: '#202330',
            },
            white: '#e6e6e6',
        },
    },
})