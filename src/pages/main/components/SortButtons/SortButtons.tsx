import styles from './SortButtons.module.css';
import { sortTypeAtom, timeRangeAtom, triggerFetchAtom } from '@/store/search';
import { useAtom, useSetAtom } from 'jotai';
import { useEffect, useRef, useState } from 'react';
import UnderArrowIcon from '@/assets/icons/under-arrow-Icon.svg?react';
import Dropdown from '@/components/common/Dropdown';

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
}

export function SortButtons({ aiActive, setAiActive }: SortButtonsProps) {
    const [openDropdown, setOpenDropdown] = useState<'timeRange' | 'sortType' | null>(null);

    const [timeRange, setTimeRange] = useAtom(timeRangeAtom);
    const [sortType, setSortType] = useAtom(sortTypeAtom);
    const triggerFetch = useSetAtom(triggerFetchAtom);

    const timeRef = useRef<HTMLButtonElement>(null);
    const sortRef = useRef<HTMLButtonElement>(null);
    const isFirstRender = useRef(true);

    useEffect(() => {
        triggerFetch();
    }, [timeRange, sortType, triggerFetch]);

    useEffect(() => {
        isFirstRender.current = false;
    }, []);

    return (
        <div className={styles.container}>
            <button
                className={`${styles.sortButton} ${styles.aiSortButton} ${aiActive && styles.aiSortButton_active}`}
                onClick={() => setAiActive(prev => !prev)}
            >
                <div className={styles.aiSortButton__gradient} />
                <div className={`${styles.iconWrapper} ${aiActive && styles.iconWrapper_active}`}>
                    <img src={'src/assets/icons/ai-Icon.png'} />
                    <img className={styles.aiIcon_active} src={'src/assets/icons/ai-active-Icon.png'} />
                </div>
                <div
                    className={
                        styles.aiSortButtonContent +
                        (isFirstRender.current
                            ? ''
                            : aiActive
                              ? ' ' + styles.aiSortButtonContentFadeIn
                              : ' ' + styles.aiSortButtonContentFadeOut)
                    }
                >
                    AI 추천
                </div>
            </button>

            <button
                className={styles.sortButton}
                ref={timeRef}
                onClick={() => setOpenDropdown(prev => (prev === 'timeRange' ? null : 'timeRange'))}
            >
                <span>{timeRangeOptions.find(opt => opt.value === timeRange)?.label}</span>
                <UnderArrowIcon width={9} height={5} style={{ fill: 'var(--color-content-sub)' }} />
            </button>
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

            <button
                className={styles.sortButton}
                ref={sortRef}
                onClick={() => setOpenDropdown(prev => (prev === 'sortType' ? null : 'sortType'))}
            >
                <span>{sortOptions.find(opt => opt.value === sortType)?.label}</span>
                <UnderArrowIcon width={9} height={5} style={{ fill: 'var(--color-content-sub)' }} />
            </button>
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
        </div>
    );
}
