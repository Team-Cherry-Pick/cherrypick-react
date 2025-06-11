import styles from './Footer.module.css';
import Logo from '@/assets/icons/black-logo-Icon.svg';

interface FooterProps {
    background?: 'root' | 'board';
}

export default function Footer({ background = 'root' }: FooterProps) {
    return (
        <div
            className={`${styles.footerWrapper} ${background === 'root' ? styles.rootBackground : styles.boardBackground}`}
        >
            <footer className={styles.footerContainer}>
                <div className={styles.footerContent}>
                    <div className={styles.logoSection}>
                        <img className={styles.logoImg} src={Logo} alt="logo" />
                        <div className={styles.serviceName}>Repik</div>
                    </div>
                    <div className={styles.linkList}>
                        <span>서비스소개</span>
                        <span className={styles.divider}>|</span>
                        <span>공지사항</span>
                        <span className={styles.divider}>|</span>
                        <span>이용약관</span>
                        <span className={styles.divider}>|</span>
                        <span>개인정보처리방침</span>
                    </div>
                    <div className={styles.copyNotice}>©Copyright 2025. Repik. All Right Reserved</div>
                </div>
            </footer>
        </div>
    );
}
