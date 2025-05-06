import styled from 'styled-components';
import { useAtom } from 'jotai';
import { newDealAtom, selectedCategoryPathAtom } from '@/store/deals';
import { TextInput, SelectTrigger } from '@/components/common/Input';

const ProductInfoSection = ({ onOpenCategoryModal }: { onOpenCategoryModal: () => void }) => {
    const [deal, setDeal] = useAtom(newDealAtom);
    const [categoryPath] = useAtom(selectedCategoryPathAtom);

    return (
        <SectionContainer>
            <SectionTitle>상품 정보</SectionTitle>
            <TextInput
                placeholder="상품명 입력"
                value={deal.title}
                onChange={(e) => setDeal({ ...deal, title: e.target.value })}
            />
            <SelectTrigger
                label={categoryPath || '카테고리 선택'}
                onClick={onOpenCategoryModal}
            />
        </SectionContainer>
    );
};

export default ProductInfoSection;

const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  gap: ${({ theme }) => theme.spacing[2]};

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const SectionTitle = styled.div`
  color: ${({ theme }) => theme.colors.content.main};
  font-size: ${({ theme }) => theme.typography.size.lg};
  font-weight: ${({ theme }) => theme.typography.weight.semibold};
`;
