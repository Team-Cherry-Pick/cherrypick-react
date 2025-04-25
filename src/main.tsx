import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { FontStyle } from '@/styles/global/fonts';
import GlobalStyle from '@/styles/global';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from '@/styles/theme';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ThemeProvider theme={lightTheme}>
            <FontStyle />
            <GlobalStyle />
            <App />
        </ThemeProvider>
    </React.StrictMode>
);
