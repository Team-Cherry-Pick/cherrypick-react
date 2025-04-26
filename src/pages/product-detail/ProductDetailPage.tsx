import { useParams } from "react-router-dom";
import DefaultLayout from '@/components/layout/DefaultLayout';

const ProductDetailPage = () => {
    const { id } = useParams();

    return (
        <DefaultLayout>
            <h1>📦 상품 상세 페이지</h1>
            <p>상품 ID: {id}</p>
        </DefaultLayout>
    );
};

export default ProductDetailPage;
