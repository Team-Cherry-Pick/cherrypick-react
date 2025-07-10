// pages/login/LoginSuccessPage.tsx
import { AccessTokenService } from '@/services/accessTokenService';
import { AccessTokenType } from '@/types/Api';
import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

const LoginRedirectPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        const handleLoginRedirect = async () => {
            const token: string | null = searchParams.get('token');
            const redirectPath: string | null = searchParams.get('redirect');
            const email: string | null = searchParams.get('email');
            const isNewUser: boolean = searchParams.get('isNewUser') === 'true';

            // 로그인에 실패한 경우 에러 메세지 표출
            if (!token || !redirectPath || !email) {
                const loginFailMessage: string = '로그인에 실패했습니다.';
                alert(loginFailMessage);
                navigate('/');
                return;
            }

            // 기존 유저인 경우 기존 페이지로 이동
            if (!isNewUser) {
                AccessTokenService.save(AccessTokenType.USER, token);
                navigate(redirectPath);
                return;
            }

            // 신규 유저인 경우 token, redirect, email 정보를 동반하여 회원가입 진행 시퀀스 진행 (회원정보수정 페이지로 이동)
            const registerTokenState: string = token;
            const redirectPathState: string = redirectPath;
            const emailState: string = email;
            navigate('/profile-edit', {
                state: { registerTokenState, redirectPathState, emailState }
            });
        };

        handleLoginRedirect();
    }, [searchParams, navigate]);

    return <div>로그인 처리 중입니다...</div>;
};
export default LoginRedirectPage;
