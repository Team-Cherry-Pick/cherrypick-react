// styles/global/index.ts
import { createGlobalStyle } from 'styled-components';
import { typography } from './typography';
import reset from './reset';

const GlobalStyle = createGlobalStyle`
    ${reset}

    html {
        font-size: 16px;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    body {
    font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif;
    font-size: ${typography.size.base};
    font-weight: ${typography.weight.regular};
    line-height: 1.5;
    color: ${({ theme }) => theme.colors.neutral[800]}; // contentMain 대신 neutral 사용
    background-color: ${({ theme }) => theme.colors.neutral[0]}; // rootBg 대신 neutral 사용
    margin: 0;
        padding: 0;
    }

    * {
        box-sizing: border-box;
    }

    a {
        color: inherit;
        text-decoration: none;
    }

    button, input, textarea {
        font-family: inherit;
        font-size: inherit;
        border: none;
        background: none;
        padding: 0;
        margin: 0;
    }

    button {
        cursor: pointer;
    }
`;

export default GlobalStyle;
