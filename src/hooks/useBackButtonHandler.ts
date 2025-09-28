import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AccessTokenService } from '@/services/accessTokenService';

/**
 * 로그인된 상태에서 뒤로가기 시 메인 페이지로 리다이렉트하는 훅
 * 로그인 페이지나 베타테스터 신청 페이지에서 사용
 */
export const useRedirectOnBackWhenLoggedIn = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const isLoggedIn = AccessTokenService.hasToken();
        
        if (isLoggedIn) {
            // 로그인된 상태라면 현재 페이지를 히스토리에서 제거하고 메인 페이지로 교체
            // 이렇게 하면 뒤로가기 시 loginRedirectPage가 아닌 메인 페이지로 이동
            navigate('/', { replace: true });
        }
    }, [navigate]);
};