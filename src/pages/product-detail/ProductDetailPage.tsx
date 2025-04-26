import { useParams } from "react-router-dom";
import { mockDeals } from '@/mocks/mockDeals';
import DefaultLayout from '@/components/layout/DefaultLayout';
import ProductTopSection from "./ProductTopSection";

const ProductDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const deal = mockDeals.find((d) => d.dealId === Number(id));

    if (!deal) return <div>상품을 찾을 수 없습니다.</div>;

    return (
        <DefaultLayout background="board">
            <ProductTopSection deal={deal} />
        </DefaultLayout>
    );
};

export default ProductDetailPage;

