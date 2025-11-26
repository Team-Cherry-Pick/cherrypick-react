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
import MyPage from '@/pages/my-page';
import { UserDealsPage } from '@/pages/user-deals';
import IntroPage from '@/pages/intro/IntroPage';
import { useEffect, useState } from 'react';
import { useRefreshProfile } from './hooks/useRefreshProfile';
import { InterviewBannerPopup } from './components/common/InterviewBannerPopup';
import { generateDeviceID } from './types/Auth';
import { OverlayProvider } from './context/overlay';
import { AccessTokenService } from './services/accessTokenService';
import { initializeGA4WithDeviceId } from './utils/ga4';
import PageTracker from './components/common/PageTracker';
import { sendLog } from './services/apiLog';
import { getBrowserInfo, getInflowSource, sanitizeLandingPage } from './types/Log';

const App = () => {
    const [theme] = useAtom(themeAtom);
    const { refreshProfile } = useRefreshProfile();
    const [showBannerPopup, setShowBannerPopup] = useState(false);

    useEffect(() => {
        const deviceId = localStorage.getItem('deviceID');
        if (!deviceId) {
            const newDeviceID = generateDeviceID();
            localStorage.setItem('deviceID', newDeviceID);
            initializeGA4WithDeviceId(newDeviceID);
            
            // 신규 디바이스 로그 전송
            const landingPage = sanitizeLandingPage(window.location.href);
            const inflowSource = getInflowSource();
            const { browser, version, os, userAgent } = getBrowserInfo();

            sendLog({
                logType: 'NEW_DEVICE_LOG',
                logMap: {
                    deviceId: newDeviceID,
                    landingPage,
                    inflowSource,
                    os,
                    browser,
                    version,
                    userAgent,
                },
            }).catch(() => {});

            if (AccessTokenService.get()) {
                AccessTokenService.clear();
                window.location.href = '/login';
                alert('로그인이 만료되었습니다. 다시 로그인해주세요.');
            }
        } else {
            initializeGA4WithDeviceId(deviceId);
        }

        refreshProfile();
        
        // 사이트 최초 접속 시 interview-banner 팝업 표시
        const hasSeenBanner = localStorage.getItem('hasSeenInterviewBanner');
        if (!hasSeenBanner) {
            setShowBannerPopup(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleCloseBanner = () => {
        setShowBannerPopup(false);
        localStorage.setItem('hasSeenInterviewBanner', 'true');
    };

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
                        <Route path="/my-page" element={<MyPage />} />
                        <Route path="/join-beta" element={<IntroPage />} />
                        <Route 
                            path="/user-deals/:type" 
                            element={
                                <PrivateRoute>
                                    <UserDealsPage />
                                </PrivateRoute>
                            } 
                        />
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
                {showBannerPopup && <InterviewBannerPopup onClose={handleCloseBanner} />}
            </OverlayProvider>
        </ThemeProvider>
    );
};

export default App;
