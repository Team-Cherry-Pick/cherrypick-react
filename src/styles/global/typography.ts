// styles/global/typography.ts
import { css } from 'styled-components';

export const typography = {
    weight: {
        regular: '400',
        medium: '500',
        semibold: '600',
        bold: '700'
    },
    size: {
        xs: '0.75rem',     // 12px
        sm: '0.875rem',    // 14px
        base: '1rem',      // 16px
        lg: '1.125rem',    // 18px
        xl: '1.25rem',     // 20px
        xxl: '1.5rem',     // 24px
        xxxl: '2.25rem'    // 36px
    },
    lineHeight: {
        tight: '1.25',
        base: '1.5',
        relaxed: '1.75'
    }
};

export const textStyles = {
    heading1: css`
        font-size: ${typography.size.xxxl};
        font-weight: ${typography.weight.bold};
        line-height: ${typography.lineHeight.tight};
        `,
    heading2: css`
        font-size: ${typography.size.xxl};
        font-weight: ${typography.weight.bold};
        line-height: ${typography.lineHeight.tight};
        `,
    subtitle: css`
        font-size: ${typography.size.xl};
        font-weight: ${typography.weight.semibold};
        line-height: ${typography.lineHeight.base};
        `,
    body: css`
        font-size: ${typography.size.base};
        font-weight: ${typography.weight.regular};
        line-height: ${typography.lineHeight.relaxed};
        `,
    price: {
        default: css`
        font-size: ${typography.size.lg};
        font-weight: ${typography.weight.medium};
        line-height: ${typography.lineHeight.base};
        `,
        large: css`
        font-size: ${typography.size.xl};
        font-weight: ${typography.weight.semibold};
        line-height: ${typography.lineHeight.base};
        `,
        xlarge: css`
        font-size: ${typography.size.xxl};
        font-weight: ${typography.weight.bold};
        line-height: ${typography.lineHeight.tight};
        `
    },
    meta: css`
        font-size: ${typography.size.xs};
        font-weight: ${typography.weight.regular};
        line-height: ${typography.lineHeight.base};
    `
};
