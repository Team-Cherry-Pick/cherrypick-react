import styles from './MobileComingSoonPage.module.css';
import Logo from '@/assets/icons/black-logo-Icon.svg?react';

const MobileComingSoonPage = () => {
    return (
        <div className={styles.container}>
            <div className={styles.logoSection}>
                <Logo className={styles.logoImg} />
                <div className={styles.serviceName}>Repik</div>
            </div>
            <h1 className={styles.title}>
                <span className={styles.highlight}>서비스 준비중</span>입니다
            </h1>
            <p className={styles.message}>
                리픽은 현재 PC 버전만 지원합니다.
                <br />
                모바일 버전은 <span className={styles.highlight}>8월말 출시 예정</span>입니다.
            </p>
        </div>
    );
};

export default MobileComingSoonPage;