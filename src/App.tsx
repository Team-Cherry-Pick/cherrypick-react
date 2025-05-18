import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import GlobalStyle from '@/styles/global';
import { themeAtom } from '@/store/theme';
import { lightTheme, darkTheme } from '@/styles/theme';
import useSystemTheme from '@/hooks/useSystemTheme';

import MainPage from '@/pages/main/MainPage';
import LoginPage from '@/pages/login/LoginPage';
// import UserPage from '@/pages/user/UserPage';
import ProductDetailPage from '@/pages/product-detail/ProductDetailPage';
import ProductUploadPage from '@/pages/product-upload/ProductUploadPage';
import ErrorPage from '@/pages/error/ErrorPage';
import TestPage from '@/test/TestPage';

import { ErrorModal } from '@/components/common/Modal/ErrorModal';
import LoginRedirectPage from './pages/login/LoginRedirectPage';
import ProfileEditPage from './pages/profile-edit/ProfileEditPage';

const App = () => {
    const prefersDark = useSystemTheme();
    const [theme, setTheme] = useAtom(themeAtom);

    // 초기 테마 설정
    useEffect(() => {
        const stored = localStorage.getItem('theme') as 'light' | 'dark' | null;
        if (stored) {
            setTheme(stored);
        } else {
            setTheme(prefersDark ? 'dark' : 'light');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
            <GlobalStyle />
            <Router>
                <ErrorModal />
                <Routes>
                    <Route path="/test" element={<TestPage />} />
                    <Route path="/" element={<MainPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/login-success" element={<LoginRedirectPage />} />
                    <Route path="/profile-edit" element={<ProfileEditPage />} />
                    {/* <Route path="/user" element={<UserPage />} /> */}
                    <Route path="/product/:id" element={<ProductDetailPage />} />
                    <Route path="/upload" element={<ProductUploadPage />} />
                    <Route path="/error" element={<ErrorPage />} />
                    <Route path="*" element={<Navigate to="/error?code=404" replace />} />
                </Routes>
            </Router>
        </ThemeProvider>
    );
};

export default App;
