// pages/login/LoginSuccessPage.tsx
import { AccessTokenService } from '@/services/accessTokenService';
import { AccessTokenType } from '@/types/Api';
import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

const LoginSuccessPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        const handleLoginRedirect = async () => {
            const token: string | null = searchParams.get('token');
            const redirect: string | null = searchParams.get('redirect');
            const isNewUser: boolean = searchParams.get('isNewUser') === 'true';

            if (!token || !redirect) {
                const loginFailMessage = '로그인에 실패했습니다.';
                alert(loginFailMessage);
                navigate('/');
                return;
            }

            // 기존 유저일 시 기존 페이지로 이동
            if (!isNewUser) {
                AccessTokenService.save(AccessTokenType.USER, token);
                navigate(`/${redirect.replace(/^\/?/, '')}`);
                return;
            }

            // 신규 유저일 시 회원가입 시도 후 회원정보수정 페이지로 이동
        };

        handleLoginRedirect();
    }, [searchParams, navigate]);

    return <div>로그인 처리 중입니다...</div>;
};
export default LoginSuccessPage;
