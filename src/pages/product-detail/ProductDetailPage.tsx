import { useQuery } from '@tanstack/react-query';
import { useParams } from "react-router-dom";

import DefaultLayout from '@/components/layout/DefaultLayout';
import ProductTopSection from "./ProductTopSection";
import ProductComments from "./ProductComments";
import ProductRecommend from "../../components/detail/ProductRecommend/ProductRecommend";
import styled from "styled-components";
import { fetchDetailedDeal } from '@/services/apiDeal';

function ProductDetailPage() {
    const { id } = useParams<{ id: string }>();

    const { data: deal, isLoading, isError } = useQuery({
        queryKey: ['deal', id],
        queryFn: () => fetchDetailedDeal(id!),
        enabled: !!id,
    });

    if (isLoading) return <div>로딩 중...</div>;
    if (isError || !deal) return <div>상품을 찾을 수 없습니다.</div>;

    return (
        <DefaultLayout background="board">
            <ProductTopSection deal={deal} />
            <SubContainer>
                <ProductRecommend />
                <ProductComments />
            </SubContainer>
        </DefaultLayout>
    );
}

export default ProductDetailPage;

const SubContainer = styled.div`
    display: flex;
    flex-direction: row;
    padding-top: ${({ theme }) => theme.spacing[4]};
    gap: ${({ theme }) => theme.spacing[4]};
`;
