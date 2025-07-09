import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AccessTokenService } from '@/services/accessTokenService';
import { AccessTokenType } from '@/types/Api';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
    const location = useLocation();
    const isLoggedIn = AccessTokenService.hasToken(AccessTokenType.USER);

    if (!isLoggedIn) {
        // 로그인 안 되어 있으면 로그인 페이지로 리다이렉트 + 원래 경로 저장
        return <Navigate to="/login" state={{ from: location.pathname }} replace />;
    }
    return <>{children}</>;
};

export default PrivateRoute;