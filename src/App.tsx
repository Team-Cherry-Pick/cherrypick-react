import '@/styles/global/index.css';
import { useAtom } from 'jotai';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { themeAtom } from '@/store/theme';
import { lightTheme, darkTheme } from '@/styles/theme';

import MainPage from '@/pages/main/MainPage';
import PrivateRoute from '@/components/routing/PrivateRoute';
import LoginPage from '@/pages/auth/LoginPage';
import ProductDetailPage from '@/pages/product-detail/ProductDetailPage';
import ProductUploadPage from '@/pages/product-upload/ProductUploadPage';
import ErrorPage from '@/pages/error/ErrorPage';
import LoginRedirectPage from './pages/auth/LoginRedirectPage';
import ProfileEditPage from './pages/profile-edit/ProfileEditPage';
import JoinBetaPage from '@/pages/join-beta/JoinBetaPage';
import { useEffect } from 'react';
import { useRefreshProfile } from './hooks/useRefreshProfile';
import { generateDeviceID } from './types/Auth';
import { OverlayProvider } from './context/overlay';
import { AccessTokenService } from './services/accessTokenService';
import { initializeGA4WithDeviceId } from './utils/ga4';
import PageTracker from './components/common/PageTracker';

const App = () => {
    const [theme] = useAtom(themeAtom);
    const { refreshProfile } = useRefreshProfile();

    useEffect(() => {
        const deviceId = localStorage.getItem('deviceID');
        if (!deviceId) {
            const newDeviceID = generateDeviceID();
            localStorage.setItem('deviceID', newDeviceID);
            initializeGA4WithDeviceId(newDeviceID);
            
            if (AccessTokenService.get()) {
                AccessTokenService.clear();
                window.location.href = '/login';
                alert('로그인이 만료되었습니다. 다시 로그인해주세요.');
            }
        } else {
            initializeGA4WithDeviceId(deviceId);
        }

        refreshProfile();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
            <OverlayProvider>
                <Router>
                    <PageTracker />
                    <Routes>
                        <Route path="/" element={<MainPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/login-success" element={<LoginRedirectPage />} />
                        <Route path="/profile-edit" element={<ProfileEditPage />} />
                        <Route path="/join-beta" element={<JoinBetaPage />} />
                        <Route path="/product/:id" element={<ProductDetailPage />} />
                        <Route
                            path="/upload"
                            element={
                                <PrivateRoute>
                                    <ProductUploadPage />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/upload/:dealId"
                            element={
                                <PrivateRoute>
                                    <ProductUploadPage />
                                </PrivateRoute>
                            }
                        />
                        <Route path="/error" element={<ErrorPage />} />
                        <Route path="*" element={<Navigate to="/error?code=404" replace />} />
                    </Routes>
                </Router>
            </OverlayProvider>
        </ThemeProvider>
    );
};

export default App;
