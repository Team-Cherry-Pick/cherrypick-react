import { useParams } from "react-router-dom";
import { mockDeals } from '@/mocks/mockDeals';
import DefaultLayout from '@/components/layout/DefaultLayout';
import ProductTopSection from "./ProductTopSection";
import ProductComments from "./ProductComments";
import ProductRecommend from "./ProductRecommend";
import styled from "styled-components";

const ProductDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const deal = mockDeals.find((d) => d.dealId === Number(id));

    if (!deal) return <div>상품을 찾을 수 없습니다.</div>;

    return (
        <DefaultLayout background="board">
            <ProductTopSection deal={deal} />
            <SubContainer >
                <ProductRecommend />
                <ProductComments />
            </SubContainer>
        </DefaultLayout>
    );
};

export default ProductDetailPage;

const SubContainer = styled.div`
    display: flex;
    flex-direction: row;
    padding-top: ${({ theme }) => theme.spacing[4]};
    gap: ${({ theme }) => theme.spacing[4]};
`
