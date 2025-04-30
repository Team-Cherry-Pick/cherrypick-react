import styled from 'styled-components';
import { useAtom } from 'jotai';
import { newDealAtom } from '@/store/deals';
import { TextArea } from '@/components/common/Input';

const DetailSection = () => {
    const [deal, setDeal] = useAtom(newDealAtom);

    return (
        <SectionContainer>
            <SectionTitle>상세 정보</SectionTitle>
            <TextAreaWrapper>
                <TextArea
                    placeholder="상품 설명을 입력하세요."
                    value={deal.content}
                    onChange={(e) => setDeal({ ...deal, content: e.target.value })}
                />
                <CharCount>{deal.content.length} / 800</CharCount>
            </TextAreaWrapper>
        </SectionContainer>
    );
};

export default DetailSection;

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
