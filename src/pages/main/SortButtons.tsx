import styled from 'styled-components';
import { MdAutoAwesome } from 'react-icons/md';
import UnderArrowIcon from '@/assets/icons/under-arrow-Icon.svg';

const SortButtons = () => {
    return (
        <SortWrapper>
            <AiSortButton>
                <IconCircle>
                    <MdAutoAwesome />
                </IconCircle>
                <span>AI 추천</span>
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

const BaseButton = styled.button`
  padding: ${({ theme }) => theme.spacing[1]} ${({ theme }) => theme.spacing[2]};
  border-radius: ${({ theme }) => theme.radius[6]};
  border: 1px solid ${({ theme }) => theme.colors.border.card};
  background-color: ${({ theme }) => theme.colors.neutral[20]};
  color: ${({ theme }) => theme.colors.content.sub};
  font-size: ${({ theme }) => theme.typography.size.sm};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[1.5]};
`;

const AiSortButton = styled(BaseButton)`
  font-weight: ${({ theme }) => theme.typography.weight.semibold};
`;

const SortButton = styled(BaseButton)`
  font-weight: ${({ theme }) => theme.typography.weight.regular};
`;

const IconCircle = styled.div`
  width: ${({ theme }) => theme.spacing[6]};
  height: ${({ theme }) => theme.spacing[6]};
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.neutral[300]};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1px;

  svg {
    width: ${({ theme }) => theme.spacing[3]};
    height: ${({ theme }) => theme.spacing[3]};
    fill: white;
  }
`;

