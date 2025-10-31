import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { AccessTokenService } from '@/services/accessTokenService';
import { setBetaTesterIntent } from '@/store/betaTester';
import { getAuthKakao } from '@/services/apiAuth';
import { GA4Events } from '@/utils/ga4';

type StartNowSource = 'hero' | 'footer';

export function useStartNowAction(source: StartNowSource) {
  const navigate = useNavigate();

  return useCallback(() => {
    const isLoggedIn = AccessTokenService.hasToken();

    GA4Events.pageView(`/intro/start-now/${source}`, `인트로 페이지 CTA 지금 시작하기 클릭`);

    if (!isLoggedIn) {
      GA4Events.pageView('/join-beta/apply-attempt-non-login', '비로그인 베타테스터 신청 시도');
      setBetaTesterIntent(true);
      getAuthKakao('/');
      return;
    }

    GA4Events.pageView('/join-beta/apply-start-login', '로그인 사용자 베타테스터 신청 시작');
    navigate('/');
  }, [navigate, source]);
}
