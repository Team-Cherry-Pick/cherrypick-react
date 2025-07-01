// pages/login/LoginSuccessPage.tsx
import { AccessTokenService } from '@/services/accessTokenService';
import { AccessTokenType } from '@/types/Api';
import { useEffect } from 'react';
import { useLocation, useSearchParams, useNavigate } from 'react-router-dom';

const LoginSuccessPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const location = useLocation();
    const loginFailMessage = '로그인에 실패했습니다.';

    const redirectURL = searchParams.get('redirectUrl') || location.state?.from || '/';

    useEffect(() => {
        const handleLoginRedirect = async () => {
            const userId = searchParams.get('userId');
            const accessToken = searchParams.get('accessToken');
            const isNewUser = searchParams.get('isNewUser') === 'true';

            if (!userId || !accessToken) {
                alert(loginFailMessage);
                navigate('/');
                return;
            }

            // 토큰 저장
            AccessTokenService.save(AccessTokenType.USER, accessToken);
            localStorage.setItem('userId', userId);

            if (isNewUser) {
                // 최초 로그인 사용자 처리
                navigate(redirectURL);
            } else {
                navigate(redirectURL);
            }
        };

        handleLoginRedirect();
    }, [searchParams, navigate, redirectURL]);

    return <div>로그인 처리 중입니다...</div>;
};
export default LoginSuccessPage;
