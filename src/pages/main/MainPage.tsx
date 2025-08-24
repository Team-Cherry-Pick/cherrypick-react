import styles from './MainPage.module.css';
import { useEffect, useState } from 'react';
import DefaultLayout from '@/components/layout/DefaultLayout';
import { MainFilter, SortButtons } from './components';
import MainDealList from './MainDealList';
import MainKeywords from './MainKeywords';
import UploadBtn from '@/components/common/Floating/UploadBtn';
import ScrollTopBtn from '@/components/common/Floating/ScrollTopBtn';
import CloseIcon from '@/assets/icons/close-Icon.svg?react';
import { useAtomValue, useSetAtom } from 'jotai';
import { keywordAtom, triggerFetchAtom } from '@/store/search';
import useIsMobileViewport from '@/hooks/useIsMobileViewport';
import MainSearchBar from './components/MainSearchBar';

const MainPage = () => {
    const [aiActive, setAiActive] = useState(false);
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
            <DefaultLayout onSearchClick={handleSearchClick}>
                <div className={styles.container}>
                    <MainFilter 
                      aiActive={aiActive}
                      isOpen={isFilterOpen}
                      onClose={() => setIsFilterOpen(false)}
                    />
                    <div style={{ width: '100%' }}>
                        <div className={getSearchBarWrapperClass()} onClick={isMobile ? handleSearchOverlayClose : undefined}>
                            <div className={styles.searchOverlayContent} onClick={(e) => e.stopPropagation()}>
                                <MainSearchBar 
                                    aiActive={aiActive} 
                                    setAiActive={setAiActive}
                                    onClose={handleSearchOverlayClose}
                                />
                                {isMobile && isSearchOverlayOpen && (
                                    <CloseIcon className={styles.closeButton} onClick={handleSearchOverlayClose}/>
                                )}
                            </div>
                        </div>
                        <div className={styles.sortRow}>
                            <MainKeywords aiActive={aiActive} keyword={keyword} />
                            <SortButtons 
                              aiActive={aiActive} 
                              setAiActive={setAiActive}
                              onFilterClick={() => setIsFilterOpen(true)}
                            />
                        </div>
                        <MainDealList aiActive={aiActive} />
                    </div>
                </div>

                <div className={styles.floatingWrapper}>
                    <UploadBtn />
                    <ScrollTopBtn />
                </div>
            </DefaultLayout>
        </>
    );
};

export default MainPage;
