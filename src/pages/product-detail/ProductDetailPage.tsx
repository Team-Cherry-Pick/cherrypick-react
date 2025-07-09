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

function ProductDetailPage() {
    const { id } = useParams<{ id: string }>();
    const [bestComments, setBestComments] = useState<BestComment[]>([]);
    const [commentLoading, setCommentLoading] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);

    const {
        data: deal,
        isLoading: isLoadingDeal,
        isError: isErrorDeal,
        refetch: refetchDeal,
    } = useQuery({
        queryKey: ['deal', id],
        queryFn: () => fetchDetailedDeal(id!),
        enabled: !!id,
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
        } catch (error) {
            console.error('베스트 댓글 새로고침 실패:', error);
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
            <ProductTopSection deal={deal} onVoteChange={handleVoteChange} />
            <SubContainer>
                <RecommendWrapper>
                    <ProductRecommend />
                </RecommendWrapper>

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
                            <ProductComments
                                dealId={id!}
                                refreshKey={refreshKey}
                                onLikeToggle={refreshComments}
                            />
                        </>
                    )}
                </CommentContainer>
            </SubContainer>
        </DefaultLayout>
    );
}

export default ProductDetailPage;

const SubContainer = styled.div`
    display: flex;
    flex-direction: row;
    padding: ${({ theme }) => theme.spacing[6]} 0;
    gap: ${({ theme }) => theme.spacing[6]};
`;

const RecommendWrapper = styled.div`
    width: calc(30rem + ${({ theme }) => theme.spacing[4]});
`;

const CommentContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing[6]};
    flex: 1;
`;
