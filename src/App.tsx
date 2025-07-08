import '@/styles/_global/index.css';
import { useAtom } from 'jotai';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { themeAtom } from '@/store/theme';
import { lightTheme, darkTheme } from '@/styles/theme';

import MainPage from '@/pages/main/MainPage';
import LoginPage from '@/pages/login/LoginPage';
// import UserPage from '@/pages/user/UserPage';
import ProductDetailPage from '@/pages/product-detail/ProductDetailPage';
import ProductUploadPage from '@/pages/product-upload/ProductUploadPage';
import ErrorPage from '@/pages/error/ErrorPage';
import LoginRedirectPage from './pages/login/LoginRedirectPage';

const App = () => {
    const [theme] = useAtom(themeAtom);

    return (
        <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
            <Router>
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/login-success" element={<LoginRedirectPage />} />
                    {/* <Route path="/user" element={<UserPage />} /> */}
                    <Route path="/product/:id" element={<ProductDetailPage />} />
                    <Route path="/upload" element={<ProductUploadPage />} />
                    <Route path="/upload/:id" element={<ProductUploadPage />} /> {/* 수정 모드 */}
                    <Route path="/error" element={<ErrorPage />} />
                    <Route path="*" element={<Navigate to="/error?code=404" replace />} />
                </Routes>
            </Router>
        </ThemeProvider>
    );
};

export default App;
