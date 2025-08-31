import { useQuery } from '@tanstack/react-query';
import { useParams } from "react-router-dom";
import { useEffect, useState, useCallback } from 'react';

import DefaultLayout from '@/components/layout/DefaultLayout';
import ProductTopSection from "./ProductTopSection";
import ProductComments from "../../components/detail/ProductComment";
import ProductRecommend from "../../components/detail/ProductRecommend";
import styled from "styled-components";
import { LoadingSpinner } from '@/components/common/Loading/LoadingSpinner';

import { fetchDetailedDeal } from '@/services/apiDeal';
import { fetchBestCommentsByDealId } from '@/services/apiComment';
import BestCommentList from '@/components/detail/ProductComment/BestCommentList';
import type { BestComment } from '@/types/Comment';
// viewport handled by CSS media queries in this file

function ProductDetailPage() {
    const { id } = useParams<{ id: string }>();
    const [bestComments, setBestComments] = useState<BestComment[]>([]);
    const [commentLoading, setCommentLoading] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);
    // viewport width handled via CSS media query in ContentWrapper

    const {
        data: deal,
        isLoading: isLoadingDeal,
        isError: isErrorDeal,
        refetch: refetchDeal,
    } = useQuery({
        queryKey: ['deal', id],
        queryFn: () => fetchDetailedDeal(id!),
        enabled: !!id,
        retry: false,
    });

    // 투표 변경 시 딜 데이터 다시 가져오기
    const handleVoteChange = useCallback(() => {
        refetchDeal();
    }, [refetchDeal]);

    // 베스트 댓글 새로고침 함수
    const refreshBestComments = useCallback(async () => {
        if (!id) return;

        setCommentLoading(true);
        try {
            const data = await fetchBestCommentsByDealId(id);
            setBestComments(data);
        } catch {
            setBestComments([]);
        } finally {
            setCommentLoading(false);
        }
    }, [id]);

    // 댓글 전체 새로고침 함수
    const refreshComments = useCallback(() => {
        setRefreshKey(prev => prev + 1);
        refreshBestComments();
    }, [refreshBestComments]);

    useEffect(() => {
        refreshBestComments();
    }, [refreshBestComments]);

    if (isLoadingDeal) {
        return <LoadingSpinner />;
    }

    if (isErrorDeal || !deal) {
        return <div>상품을 찾을 수 없습니다.</div>;
    }

    return (
        <DefaultLayout background="board">
            <ContentWrapper>
                <ProductTopSection deal={deal} onVoteChange={handleVoteChange} />
                <Divider />
                <SubContainer>
                    <RecommendWrapper>
                        <ProductRecommend />
                    </RecommendWrapper>
                    <Divider />
                    <CommentContainer>
                        {commentLoading ? (
                            <LoadingSpinner />
                        ) : (
                            <>
                                {bestComments && bestComments.length > 0 && (
                                    <BestCommentList
                                        bestComments={bestComments}
                                        onLikeToggle={refreshComments}
                                    />
                                )}
                                <Divider />
                                <ProductComments
                                    dealId={id!}
                                    refreshKey={refreshKey}
                                    onLikeToggle={refreshComments}
                                />
                            </>
                        )}
                    </CommentContainer>
                </SubContainer>
            </ContentWrapper>
        </DefaultLayout>
    );
}

export default ProductDetailPage;

const SubContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const RecommendWrapper = styled.div`
    width: 100%;
    box-shadow: none;
`;

const CommentContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    width: 100%;
    box-shadow: none;
`;

const ContentWrapper = styled.div`
    margin: 0 auto;
    width: 100%;
    max-width: 37.5rem;
    background-color: ${({ theme }) => theme.colors.background.board};
    @media (min-width: 37.5rem) {
        border: 0.5px solid ${({ theme }) => theme.colors.border.board};
        border-bottom: none;
        border-top-left-radius: 1rem;
        border-top-right-radius: 1rem;
        margin-top: 2rem;
    }
`;

const Divider = styled.div`
    width: 100%;
    height: 0.5rem;
    background-color: ${({ theme }) => theme.colors.neutral[50]};
`;