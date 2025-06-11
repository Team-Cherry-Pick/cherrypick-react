import '@/styles/_global/index.css';
import Footer from './components/Footer';
import Header from './components/Header';
import styles from './DefaultLayout.module.css';
import { useLocation } from 'react-router-dom';
import { ThemeProvider } from '@/styles/_global/ThemeProvider';

interface DefaultLayoutProps {
    children: React.ReactNode;
    background?: 'root' | 'board';
}

export default function DefaultLayout({ children, background = 'root' }: DefaultLayoutProps) {
    const location = useLocation();
    const isFullWidth = location.pathname === '/upload';

    return (
        <ThemeProvider>
            <div
                className={`${styles.wrapper} ${background === 'root' ? styles.rootBackground : styles.boardBackground}`}
            >
                <Header background={background} />
                <main className={styles.main}>
                    <div className={`${styles.inner} ${isFullWidth && styles.innerFullWidth}`}>{children}</div>
                </main>
                <Footer background={'board'} />
            </div>
        </ThemeProvider>
    );
}
