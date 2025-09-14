import { useEffect, useRef, useCallback, useState } from 'react';
import { CardDeal } from '@/components/common/Card';
import { fetchDeals, fetchRecommend } from '@/services/apiDeal';
import styles from './MainDealList.module.css';
import type { FetchedDeal } from '@/types/Deal';
import { LoadingSpinner } from '@/components/common/Loading/LoadingSpinner';
import { useAtomValue } from 'jotai';
import { fetchTriggerAtom, searchRequestAtom } from '@/store/search';
import { AccessTokenService } from '@/services/accessTokenService';

interface MainDealListProps {
    aiActive: boolean;
}

const MainDealList = ({ aiActive }: MainDealListProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [items, setItems] = useState<FetchedDeal[]>([]);
    const pageRef = useRef(0);
    const [hasNext, setHasNext] = useState(true);
    const observerRef = useRef<HTMLDivElement | null>(null);
    const prevSearchRequestRef = useRef<string>('');

    const searchRequest = useAtomValue(searchRequestAtom);
    const fetchTrigger = useAtomValue(fetchTriggerAtom);

    // AI 모드일 때: 추천 딜만 fetch, 필터/observer 무시
    useEffect(() => {
        if (!aiActive) {
            prevSearchRequestRef.current = '';
            return;
        }

        // 로그인 체크 - 비회원이면 API 호출하지 않음
        if (!AccessTokenService.hasToken()) {
            setItems([]);
            setHasNext(false);
            return;
        }

        setIsLoading(true);
        fetchRecommend()
            .then(res => {
                setItems(res.deals);
                setHasNext(false);
            })
            .catch(() => {
                setItems([]);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [aiActive]);

    useEffect(() => {
        if (aiActive) return;

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
    }, [fetchTrigger, aiActive, searchRequest]);

    // 무한스크롤 추가 로딩 (aiActive가 아닐 때만)
    const loadMore = useCallback(async () => {
        if (aiActive || isLoading || !hasNext) return;
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
    }, [aiActive, isLoading, hasNext, searchRequest]);

    const handleObserver = useCallback(
        (entries: IntersectionObserverEntry[]) => {
            if (aiActive) return;
            const [target] = entries;
            if (target.isIntersecting && !isLoading) {
                loadMore();
            }
        },
        [loadMore, isLoading, aiActive],
    );

    useEffect(() => {
        if (aiActive) return;
        const observer = new IntersectionObserver(handleObserver, {
            threshold: 0.1,
            rootMargin: '200px 0px',
        });

        const currentTarget = observerRef.current;
        if (currentTarget) observer.observe(currentTarget);

        return () => {
            if (currentTarget) observer.unobserve(currentTarget);
        };
    }, [handleObserver, aiActive]);

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
            {!aiActive && <div ref={observerRef} className={styles.observerTarget} />}
        </div>
    );
};

export default MainDealList;
