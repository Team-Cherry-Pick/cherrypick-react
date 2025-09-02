import { useState, useEffect, useRef } from 'react';
import styles from './MainSearchBar.module.css';
import SearchIcon from '@/assets/icons/search-Icon.svg?react';
import { useSetAtom } from 'jotai';
import { keywordAtom } from '@/store/search';
import useIsMobileViewport from '@/hooks/useIsMobileViewport';

interface MainSearchBarProps {
    aiActive: boolean;
    setAiActive: React.Dispatch<React.SetStateAction<boolean>>;
    onClose?: () => void;
}

const RECENT_KEYWORDS_KEY = 'recentKeywords';

const MainSearchBar = ({ aiActive, setAiActive, onClose }: MainSearchBarProps) => {
    const [query, setQuery] = useState('');
    const [recentKeywords, setRecentKeywords] = useState<string[]>([]);
    const setKeyword = useSetAtom(keywordAtom);
    const inputRef = useRef<HTMLInputElement>(null);
    const isMobile = useIsMobileViewport();

    useEffect(() => {
        const stored = localStorage.getItem(RECENT_KEYWORDS_KEY);
        if (stored) {
            setRecentKeywords(JSON.parse(stored));
        }
    }, []);

    // 모바일에서 컴포넌트 마운트 시 자동 포커스
    useEffect(() => {
        if (isMobile && inputRef.current) {
            // 약간의 딜레이를 주어 오버레이가 완전히 렌더링된 후 포커스
            const timer = setTimeout(() => {
                inputRef.current?.focus();
            }, 100);
            
            return () => clearTimeout(timer);
        }
    }, [isMobile]);

    const updateRecentKeywords = (keywords: string[]) => {
        setRecentKeywords(keywords);
        localStorage.setItem(RECENT_KEYWORDS_KEY, JSON.stringify(keywords));
    };

    const handleRemoveKeyword = (index: number) => {
        const updated = recentKeywords.filter((_, i) => i !== index);
        updateRecentKeywords(updated);
    };

    const handleClearAll = () => {
        updateRecentKeywords([]);
    };

    const handleSearch = (keyword?: string) => {
        const trimmed = (keyword ?? query).trim();

        if (aiActive) {
            setAiActive(false);
        }

        const filtered = recentKeywords.filter(item => item !== trimmed);
        if (trimmed) {
            const updated = [trimmed, ...filtered].slice(0, 10); // 최대 10개 저장
            updateRecentKeywords(updated);
        }

        setKeyword(trimmed);
        setTimeout(() => {
            setQuery('');
        }, 0);

        // 검색 완료 후 오버레이 닫기
        if (onClose) {
            onClose();
        }
    };

    return (
        <div className={styles.searchContainer}>
            <div className={styles.searchBarWrapper}>
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="검색어를 입력해주세요"
                    value={query}
                    className={styles.searchInput}
                    onChange={e => {
                        if (e.target.value.length > 0) {
                            setAiActive(false);
                        }
                        setQuery(e.target.value);
                    }}
                    onKeyDown={e => e.key === 'Enter' && handleSearch()}
                />
                <button
                    className={`${styles.searchButton} ${query.length > 0 ? styles.active : ''}`}
                    onClick={() => handleSearch()}
                >
                    <SearchIcon />
                </button>
            </div>

            {recentKeywords.length > 0 && (
                <div className={styles.recentSearchWrapper}>
                    <div className={styles.recentHeader}>
                        <span>최근 검색어</span>
                        {recentKeywords.length >= 3 && (
                            <button className={styles.clearAllBtn} onClick={handleClearAll}>
                                모두삭제
                            </button>
                        )}
                    </div>
                    <div className={styles.recentKeywordList}>
                        {recentKeywords.map((keyword, idx) => (
                            <div key={idx} className={styles.keywordItem}>
                                <span
                                    className={styles.keywordText}
                                    onClick={() => handleSearch(keyword)}
                                >
                                    {keyword}
                                </span>
                                <button
                                    className={styles.removeBtn}
                                    onClick={() => handleRemoveKeyword(idx)}
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MainSearchBar;
