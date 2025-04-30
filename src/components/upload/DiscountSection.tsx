import styled from 'styled-components';
import { useAtom } from 'jotai';
import { newDealAtom } from '@/store/deals';
import { TextArea, SelectTrigger } from '@/components/common/Input';

const DiscountSection = ({ onOpenDiscountModal }: { onOpenDiscountModal: () => void }) => {
    const [deal, setDeal] = useAtom(newDealAtom);

    return (
        <SectionContainer>
            <SectionTitle>할인 정보 (선택)</SectionTitle>
            <SelectTrigger
                label={deal.discountNames.join(', ') || '할인방식 선택'}
                onClick={onOpenDiscountModal}
            />
            <TextAreaWrapper>
                <TextArea
                    placeholder="최저가로 구매하기 위한 방법을 작성해주세요."
                    value={deal.discountNames[0] || ''}
                    onChange={(e) => {
                        const updated = [...deal.discountNames];
                        updated[0] = e.target.value;
                        setDeal({ ...deal, discountNames: updated });
                    }}
                />
                <CharCount>{deal.discountNames[0]?.length || 0} / 800</CharCount>
            </TextAreaWrapper>
        </SectionContainer>
    );
};

export default DiscountSection;

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

const TextAreaWrapper = styled.div`
  position: relative;
`;

const CharCount = styled.div`
  position: absolute;
  bottom: 8px;
  right: 12px;
  font-size: ${({ theme }) => theme.typography.size.xs};
  color: ${({ theme }) => theme.colors.content.sub};
`;
