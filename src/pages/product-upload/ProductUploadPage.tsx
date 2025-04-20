import { useParams } from "react-router-dom";

const ProductUploadPage = () => {
    const { id } = useParams();

    return (
        <div>
            <h1>📦 상품 업로드 페이지</h1>
            <p>상품 ID: {id}</p>
        </div>
    );
};

export default ProductUploadPage;
