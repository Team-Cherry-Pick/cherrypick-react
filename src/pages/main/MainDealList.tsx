import styled from 'styled-components';
import { CardDeal } from '@/components/common/Card';

const MainDealList = () => {
    const items = Array.from({ length: 20 });

    return (
        <DealGrid>
            {items.map((_, i) => (
                <CardDeal key={i} />
            ))}
        </DealGrid>
    );
};

export default MainDealList;

const DealGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing[4]};
  width: 100%;
`;
