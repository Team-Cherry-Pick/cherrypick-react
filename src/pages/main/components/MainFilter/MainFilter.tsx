import { useSetAtom } from 'jotai';
import styles from './MainFilter.module.css';
import { resetFiltersAtom } from '@/store/search';
import { BasicFilter, CategoryFilter, DiscountFilter, PriceFilter, StoreFilter } from './components';

export function MainFilter() {
    const resetFilters = useSetAtom(resetFiltersAtom);

    return (
        <aside className={styles.container}>
            <div className={styles.flexBox}>
                <div className={styles.title}>필터</div>
                <button className={styles.resetButton} onClick={resetFilters}>
                    전체 초기화
                </button>
            </div>

            {/* 기본 검색 필터 */}
            <BasicFilter />

            <div className={styles.divider} />

            {/* 카테고리 필터 */}
            <CategoryFilter />

            <div className={styles.divider} />

            {/* 가격 필터 */}
            <PriceFilter />

            <div className={styles.divider} />

            {/* 스토어 필터 */}
            <StoreFilter />

            <div className={styles.divider} />

            <DiscountFilter />
        </aside>
    );
}
