import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { OverlayProvider } from './context/overlay';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <OverlayProvider>
                <App />
                <ReactQueryDevtools initialIsOpen={false} />
            </OverlayProvider>
        </QueryClientProvider>
    </React.StrictMode>,
);
