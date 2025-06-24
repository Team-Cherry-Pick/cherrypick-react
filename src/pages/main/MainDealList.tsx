import { useEffect, useRef, useCallback, useState } from 'react';
import { CardDeal } from '@/components/common/Card';
import { fetchDeals, fetchRecommend } from '@/services/apiDeal';
import styled from 'styled-components';
import type { FetchedDeal } from '@/types/Deal';
import { LoadingSpinner } from '@/components/common/Loading/LoadingSpinner';
import { useAtomValue } from 'jotai';
import { fetchTriggerAtom, searchRequestAtom } from '@/store/search';

interface MainDealListProps {
    aiActive: boolean;
}

const MainDealList = ({ aiActive }: MainDealListProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [items, setItems] = useState<FetchedDeal[]>([]);
    const pageRef = useRef(0);
    const [hasNext, setHasNext] = useState(true);
    const observerRef = useRef<HTMLDivElement | null>(null);

    const searchRequest = useAtomValue(searchRequestAtom);
    const fetchTrigger = useAtomValue(fetchTriggerAtom);

    // AI 모드일 때: 추천 딜만 fetch, 필터/observer 무시
    useEffect(() => {
        if (!aiActive) return;
        let ignore = false;
        setIsLoading(true);
        fetchRecommend()
            .then(res => {
                if (!ignore) {
                    setItems(res.deals);
                    setHasNext(false);
                }
            })
            .catch(() => {
                if (!ignore) setItems([]);
            })
            .finally(() => {
                if (!ignore) setIsLoading(false);
            });
        return () => {
            ignore = true;
        };
    }, [aiActive]);

    // 트리거가 바뀌면 0페이지부터 새로 fetch (aiActive가 아닐 때만)
    useEffect(() => {
        if (aiActive) return;
        let ignore = false;
        async function fetchFirstPage() {
            setIsLoading(true);
            try {
                const { deals, hasNext: next } = await fetchDeals(0, searchRequest);
                if (!ignore) {
                    setItems(deals);
                    pageRef.current = 1;
                    setHasNext(next);
                }
            } catch {
                if (!ignore) setItems([]);
            } finally {
                if (!ignore) setIsLoading(false);
            }
        }
        fetchFirstPage();
        return () => {
            ignore = true;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
        } catch (error) {
            console.error(error);
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
            threshold: 1.0,
        });

        const currentTarget = observerRef.current;
        if (currentTarget) observer.observe(currentTarget);

        return () => {
            if (currentTarget) observer.unobserve(currentTarget);
        };
    }, [handleObserver, aiActive]);

    return (
        <DealGrid>
            {items.map((deal, i) => (
                <CardDeal key={`${deal.dealId}-${i}`} deal={deal} />
            ))}
            {isLoading && (
                <SpinnerWrapper>
                    <LoadingSpinner />
                </SpinnerWrapper>
            )}
            {!aiActive && <ObserverTarget ref={observerRef} />}
        </DealGrid>
    );
};

export default MainDealList;

const DealGrid = styled.div`
    flex: 1;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: ${({ theme }) => theme.spacing[4]};

    @media (max-width: 1024px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 600px) {
        grid-template-columns: 1fr;
    }
`;

const ObserverTarget = styled.div`
    height: 1px;
`;

const SpinnerWrapper = styled.div`
    grid-column: 1 / -1;
    display: flex;
    justify-content: center;
    padding: ${({ theme }) => theme.spacing[4]};
`;
