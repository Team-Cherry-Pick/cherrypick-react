import { useSetAtom } from 'jotai';
import styles from './MainFilter.module.css';
import { resetFiltersAtom } from '@/store/search';
import { BasicFilter, CategoryFilter, DiscountFilter, PriceFilter, StoreFilter } from './components';
import { useEffect } from 'react';
import { useCategoryNavigation } from '@/store/category';
import useIsMobileViewport from '@/hooks/useIsMobileViewport';
import { Moon, ArrowLeft } from 'lucide-react';
import { useTheme } from '@/styles/global/useTheme';
import ProfileButton from '@/components/layout/DefaultLayout/components/Header/components/ProfileButton';

interface MainFilterProps {
    aiActive: boolean;
    isOpen?: boolean;
    onClose?: () => void;
}

export function MainFilter({ aiActive, isOpen = false, onClose }: MainFilterProps) {
    const resetFilters = useSetAtom(resetFiltersAtom);
    const { reset } = useCategoryNavigation();
    const isMobile = useIsMobileViewport();
    const { toggleTheme } = useTheme();

    useEffect(() => {
        if (aiActive) {
            resetFilters();
            reset();
        }
    }, [aiActive, reset, resetFilters]);

    // 모바일에서 데스크톱으로 전환될 때 필터 닫기
    useEffect(() => {
        if (!isMobile && isOpen && onClose) {
            onClose();
        }
    }, [isMobile, isOpen, onClose]);

    // 모바일 필터가 열렸을 때 body 스크롤 막기
    useEffect(() => {
        if (isMobile && isOpen) {
            // 현재 스크롤 위치 저장
            const scrollY = window.scrollY;
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollY}px`;
            document.body.style.width = '100%';
            document.body.style.overflow = 'hidden';

            return () => {
                // 필터가 닫힐 때 원래 상태로 복원
                document.body.style.position = '';
                document.body.style.top = '';
                document.body.style.width = '';
                document.body.style.overflow = '';
                window.scrollTo(0, scrollY);
            };
        }
    }, [isMobile, isOpen]);

    // 모바일 환경
    if (isMobile) {
        // 열리지 않았으면 아무것도 렌더링하지 않음
        if (!isOpen) return null;
        
        // 모바일 전체화면 모달
        return (
            <div className={styles.mobileOverlay}>
                <div className={styles.mobileContainer}>
                    {/* 모바일 헤더 */}
                    <div className={styles.mobileHeader}>
                        <div className={styles.mobileHeaderLeft}>
                            <ArrowLeft 
                                className={styles.backButton} 
                                onClick={onClose}
                            />
                            <span className={styles.mobileTitle}>필터</span>
                        </div>
                        <div className={styles.mobileHeaderRight}>
                            <Moon className={styles.themeToggleIcon} onClick={toggleTheme} />
                            <ProfileButton />
                        </div>
                    </div>

                    {/* 필터 내용 */}
                    <div className={styles.mobileContent}>
                        <div className={styles.flexBox}>
                            <div className={styles.title}>필터</div>
                            <button className={styles.resetButton} onClick={resetFilters}>
                                전체 초기화
                            </button>
                        </div>

                        <BasicFilter />
                        {!aiActive && (
                            <>
                                <div className={styles.divider} />
                                <CategoryFilter />
                                <div className={styles.divider} />
                                <PriceFilter />
                                <div className={styles.divider} />
                                <StoreFilter />
                                <div className={styles.divider} />
                                <DiscountFilter />
                            </>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    // 데스크톱 환경 - 기본 사이드바
    return (
        <aside className={styles.container}>
            <div className={styles.flexBox}>
                <div className={styles.title}>필터</div>
                <button className={styles.resetButton} onClick={resetFilters}>
                    전체 초기화
                </button>
            </div>

            <BasicFilter />
            {!aiActive && (
                <>
                    <div className={styles.divider} />
                    <CategoryFilter />
                    <div className={styles.divider} />
                    <PriceFilter />
                    <div className={styles.divider} />
                    <StoreFilter />
                    <div className={styles.divider} />
                    <DiscountFilter />
                </>
            )}
        </aside>
    );
}
