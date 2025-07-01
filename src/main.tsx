import ReactDOM from 'react-dom/client';
import App from './App.tsx';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { OverlayProvider } from './context/overlay';

const queryClient = new QueryClient();

if (import.meta.env.DEV) {
    import('crypto-js').then(CryptoJS => {
        const token = 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjIsIm5pY2tuYW1lIjoi7IK065yw7ZWcIOq5gOuPmeyZhCIsInJvbGUiOiJDTElFTlQiLCJ0eXBlIjoiYWNjZXNzIiwiaWF0IjoxNzUxMjk2MDI2LCJleHAiOjE3NTE2NTYwMjZ9.g1r13SmWAqGriWnJU4nlJhOhido5f2fJ-nEY__qoyqU'; // 작업용 JWT 토큰
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
