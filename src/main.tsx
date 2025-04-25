import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { FontStyle } from '@/styles/global/fonts';
import GlobalStyle from '@/styles/global';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from '@/styles/theme';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={lightTheme}>
                <FontStyle />
                <GlobalStyle />
                <App />
                <ReactQueryDevtools initialIsOpen={false} />
            </ThemeProvider>
        </QueryClientProvider>
    </React.StrictMode>
);
