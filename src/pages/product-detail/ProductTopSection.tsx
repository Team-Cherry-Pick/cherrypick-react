// ProductTopSection.tsx
import { useAtomValue } from 'jotai';
import styled from 'styled-components';
import { selectedDealAtom } from '@/store/deals';
import { CardDeal } from '@/components/common/Card';

const ProductTopSection = () => {
    const deal = useAtomValue(selectedDealAtom);
    if (!deal) return null;

    return (
        <Wrapper>
            <ImageBox>
                {/* TODO: 실제 상품 이미지 URL로 교체 */}
                <ProductImage src="https://via.placeholder.com/300" alt="상품 이미지" />
            </ImageBox>
            <CardBox>
                <CardDeal deal={deal} />
            </CardBox>
        </Wrapper>
    );
};

export default ProductTopSection;

const Wrapper = styled.section`
  display: flex;
  gap: ${({ theme }) => theme.spacing[6]};
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ImageBox = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProductImage = styled.img`
  width: 100%;
  max-width: 400px;
  border-radius: ${({ theme }) => theme.radius[3]};
`;

const CardBox = styled.div`
  flex: 1;
`;
