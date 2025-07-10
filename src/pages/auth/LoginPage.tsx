import styles from './LoginPage.module.css';
import DefaultLayout from '@/components/layout/DefaultLayout';
import RepikLogo from '@/assets/icons/logo-Icon.svg';
import KakaoLogo from '@/assets/icons/kakao-Icon.svg';
import { getAuthKakao } from '@/services/apiAuth';

const LoginPage = () => {

    // @todo : 회원이라면 라우팅 접근 불가능하도록 설정

    return (
        <DefaultLayout background="board">
            <div className={styles.container}>
                <div className={styles.loginBoxWrapper}>
                    <div className={styles.logoWrapper}>
                        <img className={styles.repikLogoImg} src={RepikLogo} alt="logo" />
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
                    <button
                        className={styles.kakaoLoginButton}
                        onClick={() => getAuthKakao({ redirect: '/' })}
                    >
                        <img
                            className={styles.kakaoLoginLogoImage}
                            src={KakaoLogo}
                            alt="kakao login"
                        />
                        <p className={styles.kakaoLoginText}>카카오 로그인/회원가입</p>
                    </button>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default LoginPage;