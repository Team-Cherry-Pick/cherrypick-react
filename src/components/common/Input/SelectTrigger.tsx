// 단순히 모달 열기 위한 트리거용
import styled from 'styled-components';
import RightArrowIcon from '@/assets/icons/right-arrow-Icon.svg';

interface Props {
    label: string;
    onClick?: () => void;
}

export const SelectTrigger = ({ label, onClick }: Props) => {
    return (
        <StyledSelectTrigger onClick={onClick}>
            <Label>{label}</Label>
            <img src={RightArrowIcon} alt="선택" />
        </StyledSelectTrigger>
    );
}

const Label = styled.span`
  font-size: ${({ theme }) => theme.typography.size.sm};
  color: ${({ theme }) => theme.colors.content.main};
`;

const StyledSelectTrigger = styled.button`
    display: flex;
    width: 100%;
    padding: 12px 16px;
    align-items: center;
    justify-content: space-between;
    gap: 10px;

    border-radius: 8px;
    border: 1px solid ${({ theme }) => theme.colors.neutral[100]};
    background: ${({ theme }) => theme.colors.neutral[0]};
    cursor: pointer;

    font-size: 14px;
    color: ${({ theme }) => theme.colors.content.main};
`;
