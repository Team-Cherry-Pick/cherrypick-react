import styled from 'styled-components';
import { typography } from '@/styles/global/typography';

export const InputWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100vw;
    gap: 12px;
`;

export const InputContainer = styled.div`
    display: flex;
    align-items: center;
    background-color: ${({ theme }) => theme.colors.neutral[50]};
    border-radius: 12px;
    padding: 12px 16px;
    flex-shrink: 0;
    width: 63%;
`;

export const StyledInput = styled.input`
    flex: 1;
    border: none;
    outline: none;
    background-color: transparent;
    font-size: ${typography.size.sm};
    font-weight: ${typography.weight.regular};
    color: ${({ theme }) => theme.colors.content.main};
    line-height: ${typography.lineHeight.base};
    font-family: 'Pretendard', sans-serif;
    justify-content: space-between;
    align-items: center;
    &::placeholder {
        color: ${({ theme }) => theme.colors.content.sub};
    }
`;

export const IconButton = styled.button`
    background: none;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    margin-left: 12px;
    cursor: pointer;

    svg,
    img {
        width: 16px;
        height: 16px;
        fill: ${({ theme }) => theme.colors.content.tertiary};
    }
`;

export const DirectInputButton = styled.button<{ active?: boolean }>`
    background-color: ${({ theme, active }) =>
        active ? theme.colors.neutral[700] : theme.colors.neutral[300]};
    color: ${({ theme }) => theme.colors.neutral[0]};
    font-size: ${typography.size.sm};
    font-weight: ${typography.weight.regular};
    line-height: ${typography.lineHeight.base};
    border: none;
    border-radius: 8px;
    cursor: pointer;
    padding: 12px 16px;
`;

export const GuideText = styled.div`
    margin: 24px auto;
    color: ${({ theme }) => theme.colors.content.sub};
    font-size: ${typography.size.sm};
    font-weight: ${typography.weight.regular};
    text-align: center;
    white-space: pre-line;
`;
