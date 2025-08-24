import styles from './Header.module.css';
import Logo from '@/assets/icons/logo-Icon.svg?react';
import SearchIcon from '@/assets/icons/search-Icon.svg?react';
import LeftArrowIcon from '@/assets/icons/left-arrow-Icon.svg?react';
import { Moon } from 'lucide-react';
import { useTheme } from '@/styles/global/useTheme';
import ProfileButton from './components/ProfileButton';
import { useNavigate, useLocation } from 'react-router-dom';
import useIsMobileViewport from '@/hooks/useIsMobileViewport';
import { useAtomValue } from 'jotai';
import { keywordAtom } from '@/store/search';

interface HeaderProps {
    background?: 'root' | 'board';
    onSearchClick?: () => void;
}

export default function Header({ background = 'root', onSearchClick }: HeaderProps) {
    const { toggleTheme } = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const isMobile = useIsMobileViewport();
    const keyword = useAtomValue(keywordAtom);
    
    // 메인 페이지 여부 확인
    const isMainPage = location.pathname === '/';
    
    // 검색 상태 확인
    const isSearchActive = keyword && keyword.trim().length > 0;
    
    // 페이지별 제목 매핑
    const getPageTitle = () => {
        const pathname = location.pathname;
        
        if (pathname.startsWith('/upload')) return '핫딜 업로드';
        if (pathname.startsWith('/product/')) return '핫딜 상세';
        if (pathname === '/profile-edit') return '회원정보 수정';
        if (pathname === '/login') return '로그인';
        
        return '페이지';
    };
    
    const handleBack = () => {
        navigate(-1);
    };

    const handleSearchClick = () => {
        if (isMobile && onSearchClick) {
            onSearchClick();
        }
    };

    return (
        <div
            className={`${styles.headerWrapper} ${background === 'root' ? styles.rootBackground : styles.boardBackground}`}
        >
            <header className={styles.headerContainer}>
                {(isMainPage || !isMobile) ? (
                    // 메인 페이지 또는 데스크톱: 로고 표시
                    <div className={styles.logoWrapper} onClick={() => (window.location.href = '/')}>
                        <Logo className={styles.logoImg} />
                        <div className={styles.logoText}>Repik</div>
                    </div>
                ) : (
                    // 모바일 서브 페이지: 뒤로가기 버튼 + 페이지 제목
                    <div className={styles.navigationWrapper}>
                        <LeftArrowIcon 
                            className={styles.backButton} 
                            onClick={handleBack}
                        />
                        <div className={styles.pageTitle}>
                            {getPageTitle()}
                        </div>
                    </div>
                )}
                
                <div className={styles.personalContainer}>
                    {isMainPage && (
                        <div 
                            className={`${styles.searchIcon} ${isSearchActive ? styles.searchIconActive : ''}`}
                            onClick={handleSearchClick}
                        >
                            <SearchIcon />
                        </div>
                    )}
                    <Moon className={styles.themeToggleIcon} onClick={toggleTheme} />
                    <ProfileButton />
                </div>
            </header>
        </div>
    );
}
