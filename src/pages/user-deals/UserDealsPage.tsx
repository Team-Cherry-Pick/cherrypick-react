import { useEffect, useRef, useCallback, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CardDeal } from '@/components/common/Card';
import { fetchUserWrittenDeals, fetchUserCommentedDeals, fetchUserLikedDeals } from '@/services/apiDeal';
import { LoadingSpinner } from '@/components/common/Loading/LoadingSpinner';
import DefaultLayout from '@/components/layout/DefaultLayout';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from '@/styles/theme';
import type { FetchedDeal } from '@/types/Deal';
import { AccessTokenService } from '@/services/accessTokenService';
import styles from './UserDealsPage.module.css';

type DealType = 'written' | 'commented' | 'liked';

const DEAL_TYPE_TITLES: Record<DealType, string> = {
    written: '내가 찾은 할인',
    liked: '추천한 할인',
    commented: '댓글 단 할인',
};

const UserDealsPage = () => {
    const { type } = useParams<{ type: string }>();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [items, setItems] = useState<FetchedDeal[]>([]);
    const pageRef = useRef(0);
    const [hasNext, setHasNext] = useState(true);
    const observerRef = useRef<HTMLDivElement | null>(null);

    // 유효한 타입인지 확인
    const dealType = type as DealType;
    const isValidType = dealType && ['written', 'commented', 'liked'].includes(dealType);

    // API 함수 선택
    const getFetchFunction = useCallback((type: DealType) => {
        switch (type) {
            case 'written':
                return fetchUserWrittenDeals;
            case 'commented':
                return fetchUserCommentedDeals;
            case 'liked':
                return fetchUserLikedDeals;
            default:
                return fetchUserWrittenDeals;
        }
    }, []);

    // 로그인 체크 및 유효성 검사
    useEffect(() => {
        if (!AccessTokenService.hasToken() || !isValidType) {
            navigate('/my-page');
            return;
        }
    }, [navigate, isValidType]);

    // 첫 페이지 로딩
    useEffect(() => {
        if (!isValidType) return;

        async function fetchFirstPage() {
            setIsLoading(true);
            try {
                const fetchFunction = getFetchFunction(dealType);
                const { deals, hasNext: next } = await fetchFunction(0);
                setItems(deals);
                pageRef.current = 1;
                setHasNext(next);
            } catch (error) {
                console.error('Failed to fetch user deals:', error);
                setItems([]);
            } finally {
                setIsLoading(false);
            }
        }

        fetchFirstPage();
    }, [dealType, isValidType, getFetchFunction]);

    // 무한스크롤 추가 로딩
    const loadMore = useCallback(async () => {
        if (isLoading || !hasNext || !isValidType) return;
        setIsLoading(true);
        try {
            const fetchFunction = getFetchFunction(dealType);
            const { deals, hasNext: next } = await fetchFunction(pageRef.current);
            setItems(prev => [...prev, ...deals]);
            pageRef.current += 1;
            setHasNext(next);
        } catch (error) {
            console.error('Failed to load more deals:', error);
        } finally {
            setIsLoading(false);
        }
    }, [isLoading, hasNext, dealType, isValidType, getFetchFunction]);

    // Intersection Observer 설정
    useEffect(() => {
        const currentObserver = observerRef.current;
        const observer = new IntersectionObserver(
            entries => {
                const target = entries[0];
                if (target.isIntersecting && hasNext && !isLoading) {
                    loadMore();
                }
            },
            { threshold: 0.1 }
        );

        if (currentObserver) {
            observer.observe(currentObserver);
        }

        return () => {
            if (currentObserver) {
                observer.unobserve(currentObserver);
            }
        };
    }, [hasNext, isLoading, loadMore]);

    // 유효하지 않은 타입인 경우 렌더링하지 않음
    if (!isValidType) {
        return null;
    }

    return (
        <ThemeProvider theme={lightTheme}>
            <DefaultLayout background="board">
                <div className={styles.container}>
                    <div className={styles.dealList}>
                        {items.map((deal) => (
                            <CardDeal key={deal.dealId} deal={deal} forceMobile={true} />
                        ))}
                    </div>

                    {items.length === 0 && !isLoading && (
                        <div className={styles.emptyState}>
                            <p>아직 {DEAL_TYPE_TITLES[dealType].slice(0, -2)}이 없습니다.</p>
                        </div>
                    )}

                    {isLoading && (
                        <div className={styles.loadingWrapper}>
                            <LoadingSpinner />
                        </div>
                    )}

                    {/* 무한스크롤 트리거 */}
                    <div ref={observerRef} className={styles.observer} />
                </div>
            </DefaultLayout>
        </ThemeProvider>
    );
};

export default UserDealsPage;