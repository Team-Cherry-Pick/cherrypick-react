import { DefaultTheme } from 'styled-components';
import { typography } from './typography';
import { spacing, radius, maxWidth } from './variables';

export const primaryLayer = {
    900: '#7A0A25',
    700: '#B71A27',
    600: '#DB2726',
    500: '#FF4635',
    400: '#FF8067',
    300: '#FFA385',
    100: '#FFE7D6',
};

export const lightTheme: DefaultTheme = {
    colors: {
        primary: primaryLayer[600],
        content: {
            main: '#333333',
            sub: '#767676',
            tertiary: '#cccccc',
        },
        background: {
            root: '#ffffff',
            board: '#fbfbfb',
            card: '#ffffff',
        },
        border: {
            board: '#e6e6e6',
            card: '#f2f2f2',
        },
        neutral: {
            0: '#ffffff',
            20: '#fbfbfb',
            50: '#f2f2f2',
            100: '#e6e6e6',
            200: '#cccccc',
            300: '#b3b3b3',
            400: '#999999',
            500: '#808080',
            600: '#666666',
            700: '#4d4d4d',
            800: '#333333',
            900: '#1a1a1a',
        },
        primaryLayer,
    },
    typography,
    spacing,
    radius,
    maxWidth,
};

export const darkTheme: DefaultTheme = {
    colors: {
        primary: primaryLayer[500],
        content: {
            main: '#ffffff',
            sub: '#cccccc',
            tertiary: '#767676',
        },
        background: {
            root: '#212121',
            board: '#212121',
            card: '#292929',
        },
        border: {
            board: '#4d4d4d',
            card: '#4d4d4d',
        },
        neutral: {
            0: '#1a1a1a',
            20: '#212121',
            50: '#292929',
            100: '#333333',
            200: '#4d4d4d',
            300: '#666666',
            400: '#808080',
            500: '#999999',
            600: '#b3b3b3',
            700: '#cccccc',
            800: '#e6e6e6',
            900: '#ffffff',
        },
        primaryLayer,
    },
    typography,
    spacing,
    radius,
    maxWidth,
};
