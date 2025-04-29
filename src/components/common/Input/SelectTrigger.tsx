// SelectTrigger.tsx
import styled from 'styled-components';
import RightArrowIcon from '@/assets/icons/right-arrow-Icon.svg';

interface SelectTriggerProps {
    label: string;
}

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

export function SelectTrigger({ label }: SelectTriggerProps) {
    return (
        <StyledSelectTrigger>
            {label}
            <img src={RightArrowIcon} alt="선택" />
        </StyledSelectTrigger>
    );
}
