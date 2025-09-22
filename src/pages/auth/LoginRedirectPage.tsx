// pages/login/LoginSuccessPage.tsx
import { AccessTokenService } from '@/services/accessTokenService';
import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { GA4Events } from '@/utils/ga4';
import { postBetaTesterBadge } from '@/services/apiProfile';

import { getBetaTesterIntent, setBetaTesterIntent } from '@/store/betaTester';

const LoginRedirectPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();


    useEffect(() => {
        const handleLoginRedirect = async () => {
            const token: string | null = searchParams.get('token');
            const redirectPath: string | null = searchParams.get('redirect');
            const email: string | null = searchParams.get('email');
            const isNewUser: boolean = searchParams.get('isNewUser') === 'true';

            // URL로 직접 접근한 경우 차단
            if (!token && !redirectPath && !email) {
                alert('잘못된 접근입니다.');
                navigate('/', { replace: true });
                return;
            }

            // 로그인에 실패한 경우 에러 메세지 표출
            if (!token || !redirectPath || !email) {
                const loginFailMessage: string = '로그인에 실패했습니다.';
                alert(loginFailMessage);
                navigate('/');
                return;
            }

            // 기존 유저인 경우 기존 페이지로 이동
            if (!isNewUser) {
                AccessTokenService.save(token);
                GA4Events.login('kakao');
                
                // 베타테스터 신청 의도가 있는 경우 자동 신청
                if (getBetaTesterIntent()) {
                    try {
                        await postBetaTesterBadge();
                        GA4Events.signUp('beta_tester');
                        alert('베타테스터 신청이 완료되었습니다!');
                    } catch (error) {
                        console.error('베타테스터 신청 실패:', error);
                        GA4Events.exception('beta_tester_apply_failed', '로그인 후 베타테스터 신청 실패');
                    } finally {
                        // 베타테스터 신청 의도 초기화
                        setBetaTesterIntent(false);
                    }
                }
                
                navigate(redirectPath);
                return;
            }

            GA4Events.signUp('kakao');
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
