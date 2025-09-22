import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { GA4Events } from '@/utils/ga4';
import { AccessTokenService } from '@/services/accessTokenService';
import useIsMobileViewport from '@/hooks/useIsMobileViewport';

const PageTracker = () => {
  const location = useLocation();
  const isMobile = useIsMobileViewport();

  const getPageTitle = (pathname: string) => {
    switch (pathname) {
      case '/':
        return '메인 페이지';
      case '/login':
        return '로그인';
      case '/profile-edit':
        return '프로필 편집';
      case '/join-beta':
        return '베타 참여';
      case '/upload':
        return '핫딜 업로드';
      default:
        if (pathname.startsWith('/product/')) {
          return '핫딜 상세';
        }
        if (pathname.startsWith('/upload/')) {
          return '핫딜 수정';
        }
        return document.title || '알 수 없는 페이지';
    }
  };

  useEffect(() => {
    const isLoggedIn = AccessTokenService.hasToken();
    const basePageTitle = getPageTitle(location.pathname);
    
    // 특별한 상황을 pageTitle에 반영
    let contextualTitle = basePageTitle;
    if (location.pathname === '/login' && isLoggedIn) {
      contextualTitle = '이미 로그인된 상태에서 로그인 페이지 접근';
    } else if (location.pathname === '/upload' && !isLoggedIn) {
      contextualTitle = '비로그인 상태 업로드 페이지 접근';
    }
    
    // 단일 페이지뷰 이벤트만 발송
    GA4Events.pageView(location.pathname, contextualTitle);
    
    // 사용자 속성 설정
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('set', {
        user_login_status: isLoggedIn ? 'logged_in' : 'logged_out',
        device_type: isMobile ? 'mobile' : 'desktop',
        page_location: window.location.href,
      });
    }
    
  }, [location.pathname, location.search, isMobile]);

  return null;
};

export default PageTracker;
