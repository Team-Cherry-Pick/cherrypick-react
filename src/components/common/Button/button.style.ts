import styled, { css, DefaultTheme } from 'styled-components';
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

  ${({ size }) => getSizeStyle(size)};
  ${({ theme, variant }) => getVariantStyle(theme, variant)};
`;

export const getSizeStyle = (size: string) => {
    if (size === 'short') {
        return css`
      height: 40px;
      padding: 6px 20px;
      width: auto;
    `;
    } else {
        return css`
      height: 48px;
      padding: 7px 20px;
      width: 240px;
    `;
    }
};

export const getVariantStyle = (theme: DefaultTheme, variant: string) => {
    switch (variant) {
        case 'main':
            return css`
        background-color: ${theme.colors.primary};
      `;
        case 'sub':
            return css`
        background-color: ${theme.colors.neutral[900]};
      `;
        case 'disabled':
            return css`
        background-color: ${theme.colors.neutral[300]};
        cursor: not-allowed;
        opacity: 0.6;
      `;
        default:
            return css`
        background-color: ${theme.colors.primary};
      `;
    }
};
