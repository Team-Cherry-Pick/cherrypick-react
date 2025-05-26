import { useNavigate, useLocation } from 'react-router-dom';
import { AccessTokenService } from '@/services/accessTokenService';
import { AccessTokenType } from '@/types/Api';

export const useRequireLogin = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const isLoggedIn = AccessTokenService.hasToken(AccessTokenType.USER);

    const guard = () => {
        if (!isLoggedIn) {
            alert('로그인 후 이용해주세요.');
            navigate('/login', {
                state: { from: location.pathname },
            });
            return false;
        }
        return true;
    };

    return { guard, isLoggedIn };
};
