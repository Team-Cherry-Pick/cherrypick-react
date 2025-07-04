import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';

import DefaultLayout from '@/components/layout/DefaultLayout';
import ProductTopSection from './ProductTopSection';
import ProductComments from '../../components/detail/ProductComment';
import ProductRecommend from '../../components/detail/ProductRecommend';
import BestCommentList from '@/components/detail/ProductComment/BestCommentList';
import styled from 'styled-components';
import { LoadingSpinner } from '@/components/common/Loading/LoadingSpinner';

import { fetchDetailedDeal } from '@/services/apiDeal';
import { fetchCommentsByDealId, fetchBestCommentsByDealId } from '@/services/apiComment';
import { Comment, BestComment } from '@/types/Comment';
import { useEffect } from 'react';

function ProductDetailPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const {
        data: deal,
        isLoading: isLoadingDeal,
        isError: isErrorDeal,
    } = useQuery({
        queryKey: ['deal', id],
        queryFn: () => fetchDetailedDeal(id!),
        enabled: !!id,
        retry: false,
    });

    const { data: comments, isLoading: isLoadingComments } = useQuery<Comment[]>({
        queryKey: ['comments', id],
        queryFn: () => fetchCommentsByDealId(id!, 'LATEST'),
        enabled: !!id,
        retry: false,
    });

    const { data: bestComments, isLoading: isLoadingBestComments } = useQuery<BestComment[]>({
        queryKey: ['bestComments', id],
        queryFn: () => fetchBestCommentsByDealId(id!),
        enabled: !!id,
    });

    useEffect(() => {
        if (isErrorDeal) {
            navigate('/');
        }
    }, [isErrorDeal, navigate]);

    if (isLoadingDeal || isLoadingComments || isLoadingBestComments) {
        return <LoadingSpinner />;
    }

    if (isErrorDeal || !deal) {
        return <div>상품을 찾을 수 없습니다.</div>;
    }

    return (
        <DefaultLayout>
            <ProductTopSection deal={deal} />
            <SubContainer>
                <RecommendWrapper>
                    <ProductRecommend />
                </RecommendWrapper>

                <CommentContainer>
                    {bestComments && bestComments.length > 0 && <BestCommentList bestComments={bestComments} />}
                    <ProductComments initialComments={comments ?? []} dealId={id!} />
                </CommentContainer>
            </SubContainer>
        </DefaultLayout>
    );
}

export default ProductDetailPage;

const SubContainer = styled.div`
    display: flex;
    flex-direction: row;
    padding: ${({ theme }) => theme.spacing[4]} 0;
    gap: ${({ theme }) => theme.spacing[4]};
`;

const RecommendWrapper = styled.div`
    width: 33%;
`;

const CommentContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing[4]};
    flex: 1;
`;
