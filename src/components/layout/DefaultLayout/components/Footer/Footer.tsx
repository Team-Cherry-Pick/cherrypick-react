import styles from './Footer.module.css';
import Logo from '@/assets/icons/black-logo-Icon.svg?react';

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
                        <Logo className={styles.logoImg} />
                        <div className={styles.serviceName}>Repik</div>
                    </div>
                    <div className={styles.linkList}>
                        <a href="https://repik-help.notion.site/" target="_blank" rel="noopener noreferrer">
                            공지사항
                        </a>
                        <span className={styles.divider}>|</span>
                        <a
                            href="https://repik-help.notion.site/terms-of-services"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            이용약관
                        </a>
                        <span className={styles.divider}>|</span>
                        <a
                            href="https://repik-help.notion.site/privacy-policy"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            개인정보처리방침
                        </a>
                    </div>
                    <div className={styles.copyNotice}>©Copyright 2025. Repik. All Right Reserved</div>
                </div>
            </footer>
        </div>
    );
}
