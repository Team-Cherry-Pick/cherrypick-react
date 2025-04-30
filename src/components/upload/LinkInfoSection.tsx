import styled from 'styled-components';
import { useAtom } from 'jotai';
import { newDealAtom } from '@/store/deals';
import { TextInput, SelectTrigger } from '@/components/common/Input';

const LinkInfoSection = ({ onOpenStoreModal }: { onOpenStoreModal: () => void }) => {
    const [deal, setDeal] = useAtom(newDealAtom);

    return (
        <SectionContainer>
            <SectionTitle>링크 정보</SectionTitle>
            <TextInput
                placeholder="상품 URL 입력"
                value={deal.originalUrl}
                onChange={(e) => setDeal({ ...deal, originalUrl: e.target.value })}
                style={{
                    color: /^https?:\/\//.test(deal.originalUrl) ? '#000' : undefined,
                    textDecoration: /^https?:\/\//.test(deal.originalUrl) ? 'underline' : undefined,
                }}
            />
            <SelectTrigger
                label={deal.storeName || '스토어 선택'}
                onClick={onOpenStoreModal}
            />
        </SectionContainer>
    );
};

export default LinkInfoSection;

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
