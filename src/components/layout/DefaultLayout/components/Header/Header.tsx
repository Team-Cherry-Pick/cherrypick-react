import styles from './Header.module.css';
import Logo from '@/assets/icons/logo-Icon.svg';
import { Moon } from 'lucide-react';
import { useTheme } from '@/styles/global/useTheme';
import ProfileButton from './ProfileButton';

interface HeaderProps {
    background?: 'root' | 'board';
}

export default function Header({ background = 'root' }: HeaderProps) {
    const { toggleTheme } = useTheme();

    return (
        <div
            className={`${styles.headerWrapper} ${background === 'root' ? styles.rootBackground : styles.boardBackground}`}
        >
            <header className={styles.headerContainer}>
                <div className={styles.logoWrapper} onClick={() => (window.location.href = '/')}>
                    <img className={styles.logoImg} src={Logo} alt="logo" />
                    <div className={styles.logoText}>Repik</div>
                </div>
                <div className={styles.personalContainer}>
                    <Moon className={styles.themeToggleIcon} onClick={toggleTheme} />
                    <ProfileButton/>
                </div>
            </header>
        </div>
    );
}
