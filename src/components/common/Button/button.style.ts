import styled, { css } from 'styled-components';
import { typography } from '@/styles/global/typography';

export const StyledButton = styled.button<{ variant: string; size: string }>`
    font-size: ${typography.size.base};
    font-weight: ${typography.weight.semibold};
    line-height: ${typography.lineHeight.base};
    border-radius: 8px;
    color: #ffffff;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    column-gap: 10px;
    border: none;
    transition: background-color 0.2s ease;

    ${({ size }) =>
        size === 'short'
            ? css`
            height: 40px;
            padding: 6px 20px;
            width: auto;
            `
            : css`
            height: 48px;
            padding: 7px 20px;
            width: 240px;
            `}

    ${({ theme, variant }) => {
        switch (variant) {
            case 'main':
                return css`
            background-color: ${theme.colors.primary}; // #ff4635
            `;
            case 'sub':
                return css`
            background-color: ${theme.colors.neutral[900]}; // #1A1A1A
            `;
            case 'disabled':
                return css`
            background-color: ${theme.colors.neutral[300]}; // #B3B3B3
            cursor: not-allowed;
            opacity: 0.6;
            `;
            default:
                return css`
            background-color: ${theme.colors.primary};
            `;
        }
    }}
    `;
