import ReactDOM from 'react-dom/client';
import App from './App.tsx';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { OverlayProvider } from './context/overlay';

const queryClient = new QueryClient();

if (import.meta.env.DEV) {
    import('crypto-js').then(CryptoJS => {
        const token = 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjEsIm5pY2tuYW1lIjoiY2hlcnJ5cGlja19kZXZfdGVhbSIsInJvbGUiOiJDTElFTlQiLCJ0eXBlIjoiYWNjZXNzIiwiaWF0IjoxNzUxNDM5NzQ5LCJleHAiOjE3NTE3OTk3NDl9.W__-9BBOPTeTVkjZz9K7Iy88TTM4w3EGmtLhQP9a0xA'; // 작업용 JWT 토큰
        const secret = import.meta.env.VITE_ENCRYPTION_KEY;
        const encrypted = CryptoJS.AES.encrypt(token, secret).toString();
        localStorage.setItem('USER_ACCESS_TOKEN', encrypted);
        console.log('[dev-only] 테스트용 USER 토큰 삽입 완료');
    });
}

ReactDOM.createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={queryClient}>
        <OverlayProvider>
            <App />
            <ReactQueryDevtools initialIsOpen={false} />
        </OverlayProvider>
    </QueryClientProvider>,
);
