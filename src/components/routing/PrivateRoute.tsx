import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AccessTokenService } from '@/services/accessTokenService';
import { AccessTokenType } from '@/types/Api';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
    const location = useLocation();
    const isLoggedIn = AccessTokenService.hasToken(AccessTokenType.USER);

    if (!isLoggedIn) {
        alert('로그인 후 이용해주세요.');
        return <Navigate to="/login" state={{ from: location.pathname }} replace />;
    }
    return <>{children}</>;
};

export default PrivateRoute;