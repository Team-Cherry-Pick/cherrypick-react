import { useState } from 'react';
import styled from 'styled-components';
import { MdAutoAwesome } from 'react-icons/md';
import UnderArrowIcon from '@/assets/icons/under-arrow-Icon.svg';

const SortButtons = () => {
    const [aiActive, setAiActive] = useState(false);

    return (
        <SortWrapper>
            <AiSortButton active={aiActive} onClick={() => setAiActive(prev => !prev)}>
                <SlidingContent>
                    <IconCircle active={aiActive} $side={aiActive ? 'right' : 'left'}>
                        <MdAutoAwesome />
                    </IconCircle>
                    <SlidingText active={aiActive} $side={aiActive ? 'left' : 'right'}>
                        AI 추천
                    </SlidingText>
                </SlidingContent>
            </AiSortButton>

            <SortButton>
                <span>최근 24시간</span>
                <img src={UnderArrowIcon} alt="arrow" />
            </SortButton>
            <SortButton>
                <span>리픽 랭킹순</span>
                <img src={UnderArrowIcon} alt="arrow" />
            </SortButton>
        </SortWrapper>
    );
};

export default SortButtons;

const SortWrapper = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[2]};
  justify-content: flex-end;

  span {
    margin: ${({ theme }) => theme.spacing[1]} ${({ theme }) => theme.spacing[0.5]};
    }
`;

const SlidingContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[1]};
  position: relative;
  width: 100%;
  height: ${({ theme }) => theme.spacing[6]};
`;


const BaseButton = styled.button`
  padding: ${({ theme }) => theme.spacing[1]} ${({ theme }) => theme.spacing[2]};
  border-radius: ${({ theme }) => theme.radius[6]};
  border: 1px solid ${({ theme }) => theme.colors.border.card};
  background-color: ${({ theme }) => theme.colors.neutral[20]};
  color: ${({ theme }) => theme.colors.content.sub};
  font-size: ${({ theme }) => theme.typography.size.sm};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[1]};
`;

const AiSortButton = styled(BaseButton) <{ active?: boolean }>`
  background: ${({ active }) =>
        active ? 'linear-gradient(90deg, #FF8067, #FF4635)' : ({ theme }) => theme.colors.neutral[20]};
  color: ${({ active }) => (active ? 'white' : ({ theme }) => theme.colors.content.sub)};
  font-weight: ${({ theme }) => theme.typography.weight.semibold};
  position: relative;
  transition: all 0.3s ease;
  justify-content: flex-start;
`;

const SortButton = styled(BaseButton)`
  font-weight: ${({ theme }) => theme.typography.weight.regular};
`;

const SlidingText = styled.span<{ active: boolean; $side: 'left' | 'right' }>`
   order: ${({ $side }) => ($side === 'left' ? 0 : 1)};
  opacity: 0;
  animation: fadeIn 0.4s ease forwards;

  @keyframes fadeIn {
    0% {
      opacity: 0;
      transform: translateX(${props => (props.$side === 'left' ? '-5px' : '5px')});
    }
    100% {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

const IconCircle = styled.div<{ active?: boolean; $side: 'left' | 'right' }>`
  order: ${({ $side }) => ($side === 'left' ? 0 : 1)};
  width: ${({ theme }) => theme.spacing[6]};
  height: ${({ theme }) => theme.spacing[6]};
  border-radius: 50%;
  background-color: ${({ active }) => (active ? '#FFD56A' : '#C4C4C4')};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  svg {
    width: ${({ theme }) => theme.spacing[3]};
    height: ${({ theme }) => theme.spacing[3]};
    fill: white;
  }
`;

