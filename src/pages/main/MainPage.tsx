import styles from './MainPage.module.css';
import { useEffect, useState } from 'react';
import DefaultLayout from '@/components/layout/DefaultLayout';
import { MainFilter, SortButtons, CategoryTabs, PCCategoryTabs } from './components';
import UploadBtn from '@/components/common/Floating/UploadBtn';
import ScrollTopBtn from '@/components/common/Floating/ScrollTopBtn';
import CloseIcon from '@/assets/icons/close-Icon.svg?react';
import { useAtomValue, useSetAtom } from 'jotai';
import { keywordAtom, triggerFetchAtom } from '@/store/search';
import useIsMobileViewport from '@/hooks/useIsMobileViewport';
import MainSearchBar from './components/MainSearchBar';
import MainKeywords from './components/MainKeywords';
import MainDealList from './components/MainDealList';
import mainBannerImg from '@/assets/banner/main-banner.jpg';
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
    const navigate = useNavigate();
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isSearchOverlayOpen, setIsSearchOverlayOpen] = useState(false);
    const keyword = useAtomValue(keywordAtom);
    const triggerFetch = useSetAtom(triggerFetchAtom);
    const isMobile = useIsMobileViewport();

    useEffect(() => {
        triggerFetch();
    }, [keyword, triggerFetch]);

    // 모바일에서 데스크탑으로 전환될 때 검색 오버레이 닫기
    useEffect(() => {
        if (!isMobile && isSearchOverlayOpen) {
            setIsSearchOverlayOpen(false);
        }
    }, [isMobile, isSearchOverlayOpen]);

    // 모바일 검색 오버레이가 열렸을 때 body 스크롤 막기
    useEffect(() => {
        if (isMobile && isSearchOverlayOpen) {
            // 현재 스크롤 위치 저장
            const scrollY = window.scrollY;
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollY}px`;
            document.body.style.width = '100%';
            document.body.style.overflow = 'hidden';

            return () => {
                // 검색 오버레이가 닫힐 때 원래 상태로 복원
                document.body.style.position = '';
                document.body.style.top = '';
                document.body.style.width = '';
                document.body.style.overflow = '';
                window.scrollTo(0, scrollY);
            };
        }
    }, [isMobile, isSearchOverlayOpen]);

    // PC 슬라이드 필터가 열렸을 때 body 스크롤 막기
    useEffect(() => {
        if (!isMobile && isFilterOpen) {
            // 현재 스크롤 위치 저장
            const scrollY = window.scrollY;
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollY}px`;
            document.body.style.width = '100%';
            document.body.style.overflow = 'hidden';

            return () => {
                // 슬라이드 필터가 닫힐 때 원래 상태로 복원
                document.body.style.position = '';
                document.body.style.top = '';
                document.body.style.width = '';
                document.body.style.overflow = '';
                window.scrollTo(0, scrollY);
            };
        }
    }, [isMobile, isFilterOpen]);

    const handleSearchClick = () => {
        setIsSearchOverlayOpen(true);
    };

    const handleSearchOverlayClose = () => {
        setIsSearchOverlayOpen(false);
    };

    const getSearchBarWrapperClass = () => {
        if (isMobile) {
            return isSearchOverlayOpen 
                ? styles.searchBarWrapperMobileOverlay 
                : styles.searchBarWrapperMobileHidden;
        }
        return styles.searchBarWrapper;
    };

    return (
        <>
            <DefaultLayout onSearchClick={handleSearchClick} background='root'>
                <div className={styles.container}>
                    {/* 모바일에서만 전체화면 필터 표시 */}
                    {isMobile && (
                        <MainFilter 
                          isOpen={isFilterOpen}
                          onClose={() => setIsFilterOpen(false)}
                        />
                    )}
                    <div className={styles.contentWrapper}>
                        <div className={`${styles.mainContent} ${!isMobile && isFilterOpen ? styles.mainContentWithFilter : ''}`}>
                            {/* 모바일에서만 검색창 표시 */}
                            {isMobile && (
                                <div className={getSearchBarWrapperClass()} onClick={isMobile ? handleSearchOverlayClose : undefined}>
                                    <div className={styles.searchOverlayContent} onClick={(e) => e.stopPropagation()}>
                                        <MainSearchBar 
                                            onClose={handleSearchOverlayClose}
                                        />
                                        {isMobile && isSearchOverlayOpen && (
                                            <CloseIcon className={styles.closeButton} onClick={handleSearchOverlayClose}/>
                                        )}
                                    </div>
                                </div>
                            )}
                            
                            {/* PC 버전 배너 */}
                            {!isMobile && (
                                <button
                                    type="button"
                                    className={styles.mainBannerButton}
                                    onClick={() => navigate('/intro')}
                                    aria-label="인트로 페이지로 이동"
                                >
                                    <img 
                                        src={mainBannerImg} 
                                        alt="메인 배너" 
                                        className={styles.mainBannerImage}
                                    />
                                </button>
                            )}
                            
                            {/* PC 버전 카테고리 탭 */}
                            {!isMobile && <PCCategoryTabs />}
                            
                            {/* 모바일 버전 카테고리 탭 */}
                            {isMobile && <CategoryTabs />}
                            
                            <div className={styles.sortRow}>
                                <MainKeywords keyword={keyword} />
                                <div className={styles.rightControls}>
                                    {!isMobile && (
                                        <div className={styles.uploadButtonWrapper}>
                                            <UploadBtn />
                                        </div>
                                    )}
                                    <SortButtons 
                                      onFilterClick={() => setIsFilterOpen(!isFilterOpen)}
                                    />
                                </div>
                            </div>
                            <MainDealList />
                        </div>
                        
                        {/* PC에서만 슬라이드 필터 표시 */}
                        {!isMobile && (
                            <div className={`${styles.slideFilter} ${isFilterOpen ? styles.slideFilterOpen : ''}`}>
                                <MainFilter 
                                  isOpen={true}
                                  onClose={() => setIsFilterOpen(false)}
                                />
                            </div>
                        )}
                    </div>
                </div>

                <div className={styles.floatingWrapper}>
                    {isMobile && <UploadBtn />}
                    <ScrollTopBtn />
                </div>
            </DefaultLayout>
        </>
    );
};

export default MainPage;
