import styles from './LoginPage.module.css';
import DefaultLayout from '@/components/layout/DefaultLayout';
import RepikLogo from '@/assets/icons/logo-Icon.svg?react';
import KakaoLogo from '@/assets/icons/kakao-Icon.svg?react';
import RedFireIcon from '@/assets/icons/red-fire.svg?react';
import { getAuthKakao } from '@/services/apiAuth';
import { AccessTokenService } from '@/services/accessTokenService';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useIsMobileViewport from '@/hooks/useIsMobileViewport';
import { useRedirectOnBackWhenLoggedIn } from '@/hooks/useBackButtonHandler';

const LoginPage = () => {
    const navigate = useNavigate();
    const isMobile = useIsMobileViewport();
    
    // 로그인된 상태에서 뒤로가기 시 메인으로 리다이렉트
    useRedirectOnBackWhenLoggedIn();

    // 로그인된 사용자는 메인 페이지로 리다이렉트
    useEffect(() => {
        if (AccessTokenService.hasToken()) {
            navigate('/', { replace: true });
        }
    }, [navigate]);

    // 베타테스터 신청 버튼 핸들러
    const handleBetaTesterApply = () => {
        navigate('/join-beta');
    };

    // 로그인된 사용자는 페이지를 렌더링하지 않음
    if (AccessTokenService.hasToken()) {
        return null;
    }

    return (
        <DefaultLayout background="board">
            <div className={styles.container}>
                <div className={`${isMobile ? styles.loginBoxMobile : styles.loginBoxWrapper}`}>
                    <div className={styles.logoWrapper}>
                        <RepikLogo className={styles.repikLogoImg} />
                        <div className={styles.repikLogoText}>Repik</div>
                    </div>
                    <p className={styles.title}>
                        <span className={styles.highlightBold}>똑똑한 소비자</span>들이 모이는 공간
                    </p>
                    <div className={styles.divider} />
                    <p className={styles.message}>
                        리픽은 <span className={styles.highlightBold}>1인 1계정</span>을 원칙으로 하며
                        <br />
                        중복계정에 따른 업자 문제를 방지합니다.
                    </p>
                    <button className={styles.kakaoLoginButton} onClick={() => getAuthKakao('/')}>
                        <KakaoLogo className={styles.kakaoLoginLogoImage} />
                        <p className={styles.kakaoLoginText}>카카오 로그인/회원가입</p>
                    </button>
                    <button className={styles.betaTesterButton} onClick={handleBetaTesterApply}>
                        <RedFireIcon className={styles.betaTesterIcon} />
                        <p className={styles.betaTesterText}>서비스 소개</p>
                    </button>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default LoginPage;
