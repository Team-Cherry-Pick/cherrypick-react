import { createGlobalStyle, css } from 'styled-components';

const fontWeights = {
    100: '1Thin',
    200: '2ExtraLight',
    300: '3Light',
    400: '4Regular',
    500: '5Medium',
    600: '6SemiBold',
    700: '7Bold',
    800: '8ExtraBold',
    900: '9Black',
} as const;

const fontFaces = css`
    ${Object.entries(fontWeights).map(
    ([weight, suffix]) => css`
        @font-face {
            font-family: 'Paperlogy';
            src: url('/assets/fonts/Paperlogy-${suffix}.ttf') format('truetype');
            font-weight: ${weight};
            font-style: normal;
        }
    `
)}
`;

export const FontStyle = createGlobalStyle`${fontFaces}`;
