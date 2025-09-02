import { useEffect, useRef, useCallback, useState } from 'react';
import { CardDeal } from '@/components/common/Card';
import { fetchDeals } from '@/services/apiDeal';
import styles from './MainDealList.module.css';
import type { FetchedDeal } from '@/types/Deal';
import { LoadingSpinner } from '@/components/common/Loading/LoadingSpinner';
import { useAtomValue } from 'jotai';
import { fetchTriggerAtom, searchRequestAtom } from '@/store/search';

const MainDealList = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [items, setItems] = useState<FetchedDeal[]>([]);
    const pageRef = useRef(0);
    const [hasNext, setHasNext] = useState(true);
    const observerRef = useRef<HTMLDivElement | null>(null);
    const prevSearchRequestRef = useRef<string>('');

    const searchRequest = useAtomValue(searchRequestAtom);
    const fetchTrigger = useAtomValue(fetchTriggerAtom);

    useEffect(() => {

        // searchRequest가 실제로 바뀌었을 때만 fetch
        const stringified = JSON.stringify(searchRequest);
        if (prevSearchRequestRef.current === stringified) return;
        prevSearchRequestRef.current = stringified;

        async function fetchFirstPage() {
            setIsLoading(true);
            try {
                const { deals, hasNext: next } = await fetchDeals(0, searchRequest);

                setItems(deals);
                pageRef.current = 1;
                setHasNext(next);
            } catch {
                setItems([]);
            } finally {
                setIsLoading(false);
            }
        }

        fetchFirstPage();
    }, [fetchTrigger, searchRequest]);

    // 무한스크롤 추가 로딩
    const loadMore = useCallback(async () => {
        if (isLoading || !hasNext) return;
        setIsLoading(true);
        try {
            const { deals, hasNext: next } = await fetchDeals(pageRef.current, searchRequest);
            setItems(prev => [...prev, ...deals]);
            pageRef.current += 1;
            setHasNext(next);
        } catch {
            // 에러 무시
        } finally {
            setIsLoading(false);
        }
    }, [isLoading, hasNext, searchRequest]);

    const handleObserver = useCallback(
        (entries: IntersectionObserverEntry[]) => {
            const [target] = entries;
            if (target.isIntersecting && !isLoading) {
                loadMore();
            }
        },
        [loadMore, isLoading],
    );

    useEffect(() => {
        const observer = new IntersectionObserver(handleObserver, {
            threshold: 1.0,
        });

        const currentTarget = observerRef.current;
        if (currentTarget) observer.observe(currentTarget);

        return () => {
            if (currentTarget) observer.unobserve(currentTarget);
        };
    }, [handleObserver]);

    return (
        <div className={styles.dealGrid}>
            {items.length ? (
                <>
                    {items.map((deal, i) => <CardDeal key={`${deal.dealId}-${i}`} deal={deal} />)}
                    {isLoading && (
                        <div className={styles.spinnerWrapper}>
                            <LoadingSpinner />
                        </div>
                    )}
                </>
            ) : isLoading ? (
                <div className={styles.spinnerWrapper}>
                    <LoadingSpinner />
                </div>
            ) : (
                <div className={styles.noSearchResult}>검색 결과가 없습니다.</div>
            )}
            <div ref={observerRef} className={styles.observerTarget} />
        </div>
    );
};

export default MainDealList;
