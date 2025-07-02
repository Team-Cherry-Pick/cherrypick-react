import { useQuery } from '@tanstack/react-query';
import { useParams } from "react-router-dom";

import DefaultLayout from '@/components/layout/DefaultLayout';
import ProductTopSection from "./ProductTopSection";
import ProductComments from "../../components/detail/ProductComment";
import ProductRecommend from "../../components/detail/ProductRecommend";
import styled from "styled-components";
import { LoadingSpinner } from '@/components/common/Loading/LoadingSpinner';

import { fetchDetailedDeal } from '@/services/apiDeal';

function ProductDetailPage() {
    const { id } = useParams<{ id: string }>();

    const {
        data: deal,
        isLoading: isLoadingDeal,
        isError: isErrorDeal,
    } = useQuery({
        queryKey: ['deal', id],
        queryFn: () => fetchDetailedDeal(id!),
        enabled: !!id,
    });

    if (isLoadingDeal) {
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
                    <ProductComments
                        dealId={id!}
                    />
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
    padding-top: 1rem;
    gap: ${({ theme }) => theme.spacing[4]};
    flex: 1;
`;
