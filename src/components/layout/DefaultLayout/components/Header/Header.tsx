import styles from './Header.module.css';
import { authTokenAtom } from '@/store';
import { useAtomValue } from 'jotai';
import PersonIcon from '@/assets/icons/person-Icon.svg';
import Logo from '@/assets/icons/logo-Icon.svg';
import { Moon } from 'lucide-react';
import { useTheme } from '@/styles/_global/useTheme';

interface HeaderProps {
    background?: 'root' | 'board';
}

export default function Header({ background = 'root' }: HeaderProps) {
    const token = useAtomValue(authTokenAtom);
    const isLoggedIn = !!token;
    const { toggleTheme } = useTheme();

    const handleProfileClick = () => {
        if (!isLoggedIn) {
            window.location.href = '/login';
        }
    };

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
                    <div className={styles.profileIcon} onClick={handleProfileClick}>
                        <div className={styles.iconWrapper}>
                            <img src={PersonIcon} alt="user" />
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
}
