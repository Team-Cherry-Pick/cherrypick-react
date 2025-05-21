// pages/login/LoginSuccessPage.tsx
import { AccessTokenService } from '@/services/accessTokenService';
import { AccessTokenType } from '@/types/Api';
import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

const LoginSuccessPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const loginFailMessage: string = '로그인에 실패했습니다.'

    useEffect(() => {
        const handleLoginRedirect = async () => {
            // SearchParams 추출
            const userId = searchParams.get('userId');
            const redirectURL = searchParams.get('redirectUrl');
            const isNewUser = searchParams.get('isNewUser') === 'true';
            if (!userId || !redirectURL) throw new Error(loginFailMessage);

            /**
             * 토큰 재발급 및 저장
             * @todo Token 하드코딩 (수정 필요)
             */
            //await refreshToken();
            const accessToken = searchParams.get('accessToken') ?? "";
            if(!accessToken) navigate(redirectURL);
            AccessTokenService.save(AccessTokenType.USER, accessToken);
            localStorage.setItem("userId", userId);

            /**
             * 신규회원/기존회원 여부 파악하여 경로 이동
             * @todo 경로 수정
             */
            if (isNewUser) {
                //navigate('/update/profile');
                navigate(redirectURL);
            } else {
                navigate(redirectURL);
            }
        }
        handleLoginRedirect();
    }, [searchParams, navigate]);

    return <div>로그인 처리 중입니다...</div>;
};

export default LoginSuccessPage;