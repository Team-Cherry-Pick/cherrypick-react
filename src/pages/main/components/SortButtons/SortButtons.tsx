import styles from './SortButtons.module.css';
import { sortTypeAtom, timeRangeAtom, triggerFetchAtom, basicFiltersAtom, priceFilterAtom, variousPriceAtom, selectedStoresAtom, selectedDiscountAtom, categoryIdAtom } from '@/store/search';
import { useAtom, useSetAtom } from 'jotai';
import { useEffect, useRef, useState } from 'react';
import UnderArrowIcon from '@/assets/icons/under-arrow-Icon.svg?react';
import FilterIcon from '@/assets/icons/filter-Icon.svg?react';
import Dropdown from '@/components/common/Dropdown';
import aiIcon from '@/assets/icons/ai-Icon.png';
import aiActiveIcon from '@/assets/icons/ai-active-Icon.png';
import useIsMobileViewport from '@/hooks/useIsMobileViewport';
import { AccessTokenService } from '@/services/accessTokenService';

const timeRangeOptions = [
    { label: '최근 3시간', value: 'LAST3HOURS' },
    { label: '최근 6시간', value: 'LAST6HOURS' },
    { label: '최근 12시간', value: 'LAST12HOURS' },
    { label: '최근 24시간', value: 'LAST24HOURS' },
    { label: '최근 3일', value: 'LAST3DAYS' },
    { label: '최근 7일', value: 'LAST7DAYS' },
];

const sortOptions = [
    { label: '리픽 랭킹순', value: 'POPULARITY' },
    { label: '최신순', value: 'LATEST' },
    { label: '조회순', value: 'VIEWS' },
    { label: '할인율순', value: 'DISCOUNT_RATE' },
    { label: '저가순', value: 'PRICE_LOW' },
    { label: '고가순', value: 'PRICE_HIGH' },
];

interface SortButtonsProps {
    aiActive: boolean;
    setAiActive: React.Dispatch<React.SetStateAction<boolean>>;
    onFilterClick?: () => void;
}

export function SortButtons({ aiActive, setAiActive, onFilterClick }: SortButtonsProps) {
    const [openDropdown, setOpenDropdown] = useState<'timeRange' | 'sortType' | null>(null);
    const [animationClass, setAnimationClass] = useState('');
    const isMobile = useIsMobileViewport();

    const [timeRange, setTimeRange] = useAtom(timeRangeAtom);
    const [sortType, setSortType] = useAtom(sortTypeAtom);
    const [basicFilters] = useAtom(basicFiltersAtom);
    const [priceFilter] = useAtom(priceFilterAtom);
    const [variousPrice] = useAtom(variousPriceAtom);
    const [selectedStores] = useAtom(selectedStoresAtom);
    const [selectedDiscounts] = useAtom(selectedDiscountAtom);
    const [categoryId] = useAtom(categoryIdAtom);
    const triggerFetch = useSetAtom(triggerFetchAtom);

    const timeRef = useRef<HTMLButtonElement>(null);
    const sortRef = useRef<HTMLButtonElement>(null);
    const prevAiActive = useRef(aiActive);

    // 필터 적용 여부 확인 (카테고리 포함)
    const isFilterApplied = 
        basicFilters.viewSoldOut || 
        basicFilters.globalShipping || 
        (priceFilter.minPrice !== undefined && priceFilter.minPrice > 0) ||
        (priceFilter.maxPrice !== undefined && priceFilter.maxPrice > 0) ||
        !variousPrice ||
        selectedStores.length > 0 ||
        selectedDiscounts.length > 0 ||
        categoryId !== undefined;

    useEffect(() => {
        triggerFetch();
    }, [timeRange, sortType, triggerFetch]);

    useEffect(() => {
        if (prevAiActive.current === aiActive) return;
        if (aiActive) {
            setAnimationClass(styles.aiSortButtonContentFadeIn);
        } else {
            setAnimationClass(styles.aiSortButtonContentFadeOut);
        }
        prevAiActive.current = aiActive;
    }, [aiActive]);

    const handleAiButtonClick = () => {
        if (!AccessTokenService.hasToken()) {
            alert('AI 추천 기능은 로그인 후 이용 가능합니다.');
            return;
        }
        setAiActive(prev => !prev);
    };

    return (
        <div className={styles.container}>
            <div className={styles.leftButtons}>
                {/* AI 추천 버튼 */}
                <button
                    className={`${styles.sortButton} ${styles.aiSortButton} ${aiActive && styles.aiSortButton_active}`}
                    onClick={handleAiButtonClick}
                >
                    <div className={styles.aiSortButton__gradient} />
                    <div className={`${styles.iconWrapper} ${aiActive && styles.iconWrapper_active}`}>
                        <img src={aiIcon} />
                        <img className={styles.aiIcon_active} src={aiActiveIcon} />
                    </div>
                    <div className={`${styles.aiSortButtonContent} ${animationClass}`}>AI 추천</div>
                </button>

                <button
                    className={styles.sortButton}
                    ref={timeRef}
                    onClick={() => setOpenDropdown(prev => (prev === 'timeRange' ? null : 'timeRange'))}
                >
                    <span>{timeRangeOptions.find(opt => opt.value === timeRange)?.label}</span>
                    <UnderArrowIcon width={9} height={5} style={{ fill: 'var(--color-content-sub)' }} />
                </button>

                <button
                    className={styles.sortButton}
                    ref={sortRef}
                    onClick={() => setOpenDropdown(prev => (prev === 'sortType' ? null : 'sortType'))}
                >
                    <span>{sortOptions.find(opt => opt.value === sortType)?.label}</span>
                    <UnderArrowIcon width={9} height={5} style={{ fill: 'var(--color-content-sub)' }} />
                </button>
            </div>

            {openDropdown === 'timeRange' && (
                <Dropdown
                    anchorRef={timeRef}
                    options={timeRangeOptions}
                    selected={timeRange || ''}
                    onSelect={value => {
                        setTimeRange(value as typeof timeRange);
                        setOpenDropdown(null);
                    }}
                    onClose={() => setOpenDropdown(null)}
                />
            )}

            {openDropdown === 'sortType' && (
                <Dropdown
                    anchorRef={sortRef}
                    options={sortOptions}
                    selected={sortType}
                    onSelect={value => {
                        setSortType(value as typeof sortType);
                        setOpenDropdown(null);
                    }}
                    onClose={() => setOpenDropdown(null)}
                />
            )}

            {isMobile && (
                <button
                    className={`${styles.filterButton} ${isFilterApplied ? styles.filterButton_active : ''}`}
                    onClick={onFilterClick}
                >
                    <div className={styles.filterIconWrapper}>
                        <FilterIcon 
                            width={10} 
                            height={10} 
                            style={{ fill: isFilterApplied ? 'var(--color-neutral-0)' : 'var(--color-content-sub)' }} 
                        />
                        {isFilterApplied && <div className={styles.filterIndicator} />}
                    </div>
                    <span>필터</span>
                </button>
            )}
        </div>
    );
}
