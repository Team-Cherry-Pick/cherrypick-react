// pages/login/LoginSuccessPage.tsx
import { AccessTokenService } from '@/services/accessTokenService';
import { getAuthRefresh } from '@/services/apiSign';
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
            const redirectURL = searchParams.get('redirectURL');
            const isNewUser = searchParams.get('isNewUser') === 'true';
            if (!userId || !redirectURL) throw new Error(loginFailMessage);

            // 토큰 재발급 및 저장
            await refreshToken();

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

    // 액세스 토큰 발급 및 저장
    const refreshToken = async () => {
        const token = await getAuthRefresh();
        if (token) {
            AccessTokenService.save(AccessTokenType.USER, token);
        } else {
            throw new Error(loginFailMessage);
        }
    };

    return <div>로그인 처리 중입니다...</div>;
};

export default LoginSuccessPage;