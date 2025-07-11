import styles from './LoginPage.module.css';
import DefaultLayout from '@/components/layout/DefaultLayout';
import RepikLogo from '@/assets/icons/logo-Icon.svg?react';
import KakaoLogo from '@/assets/icons/kakao-Icon.svg?react';
import { getAuthKakao } from '@/services/apiAuth';
import { AccessTokenService } from '@/services/accessTokenService';
import { AccessTokenType } from '@/types/Api';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const navigate = useNavigate();

    // 로그인된 사용자는 메인 페이지로 리다이렉트
    useEffect(() => {
        if (AccessTokenService.hasToken(AccessTokenType.USER)) {
            navigate('/', { replace: true });
        }
    }, [navigate]);

    // 로그인된 사용자는 페이지를 렌더링하지 않음
    if (AccessTokenService.hasToken(AccessTokenType.USER)) {
        return null;
    }

    return (
        <DefaultLayout background="board">
            <div className={styles.container}>
                <div className={styles.loginBoxWrapper}>
                    <div className={styles.logoWrapper}>
                        <RepikLogo className={styles.repikLogoImg} />
                        <div className={styles.repikLogoText}>Repik</div>
                    </div>
                    <p className={styles.title}>
                        <span className={styles.highlightBold}>진짜 할인</span>만 다시 고르다.
                    </p>
                    <div className={styles.divider} />
                    <p className={styles.message}>
                        리픽은 <span className={styles.highlightBold}>1인 1계정</span>을 원칙으로 하며
                        <br />
                        중복계정에 따른 업자 문제를 방지합니다.
                    </p>
                    <button className={styles.kakaoLoginButton} onClick={() => getAuthKakao({ redirect: '/' })}>
                        <KakaoLogo className={styles.kakaoLoginLogoImage} />
                        <p className={styles.kakaoLoginText}>카카오 로그인/회원가입</p>
                    </button>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default LoginPage;
