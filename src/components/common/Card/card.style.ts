import styled from 'styled-components';
import { typography } from '@/styles/global/typography';

export const CardWrapper = styled.div`
    width: 272px;
    height: auto;
    border-radius: 16px;
    overflow: hidden;
    background-color: white;
    border: 1px solid ${({ theme }) => theme.colors.neutral[50]};
    `;

export const ImageBox = styled.div`
    width: 272px;
    height: 272px;
    aspect-ratio: 1 / 1; // 1대 1 비율 유지
    background-color: ${({ theme }) => theme.colors.neutral[50]};
    `;

export const InfoBox = styled.div`
    padding: 16px;
    display: flex;
    flex-direction: column;
    `;

export const Title = styled.div`
    color: ${({ theme }) => theme.colors.content.main};
    font-size: ${typography.size.base};
    font-weight: ${typography.weight.semibold};
    margin-bottom: 16px;
    `;

export const TagRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    `;

export const Store = styled.span`
    color: ${({ theme }) => theme.colors.content.sub};
    font-size: ${typography.size.sm};
    font-weight: ${typography.weight.semibold};
    margin-right: 9px;
    `;

export const Tags = styled.span`
    color: ${({ theme }) => theme.colors.content.sub};
    font-size: ${typography.size.sm};
    font-weight: ${typography.weight.regular};
    margin-left: 8px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    `;

export const PriceRow = styled.div`
    display: flex;
    margin: 23px 0 8px 0;
    gap: 8px;
    align-items: flex-end;
    justify-content: flex-end;
    `;

export const Percent = styled.span`
    color: ${({ theme }) => theme.colors.primary};
    font-size: ${typography.size.lg};
    font-weight: ${typography.weight.semibold};
    `;

export const Price = styled.span`
    color: ${({ theme }) => theme.colors.content.main};
    font-size: ${typography.size.lg};
    font-weight: ${typography.weight.semibold};
    `;

export const Meta = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 4px;
    font-size: ${typography.size.xs};
    color: ${({ theme }) => theme.colors.content.sub};

    svg {
        color: ${({ theme }) => theme.colors.content.tertiary};
        width: 10px;
        height: 10px;
        margin-right: 4px;
        vertical-align: middle;
    }

    .divider {
    color: ${({ theme }) => theme.colors.content.tertiary}; // ✅ 이게 핵심
    margin: 0 4px;
    }
    `;
