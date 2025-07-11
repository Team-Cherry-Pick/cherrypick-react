import { useNavigate, useLocation } from 'react-router-dom';
import { AccessTokenService } from '@/services/accessTokenService';
import { AccessTokenType } from '@/types/Api';

export const useRequireLogin = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const isLoggedIn = AccessTokenService.hasToken(AccessTokenType.USER);

    const guard = () => {
        if (!isLoggedIn) {
            // location.state?.from이 없으면 직접 접근(새로고침, url 입력 등)
            const isDirect = !location.state?.from;
            if (isDirect) {
                alert('로그인 후 이용해주세요');
            } else {
                alert('로그인 후 이용해주세요.');
            }
            navigate('/login', {
                state: { from: location.pathname },
                replace: true,
            });
            return false;
        }
        return true;
    };

    return { guard, isLoggedIn };
};
