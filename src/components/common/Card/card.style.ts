import styled from 'styled-components';
import { typography } from '@/styles/global/typography';

export const CardWrapper = styled.div`
    width: 100%;
    max-width: 272px;
    border-radius: 16px;
    overflow: hidden;
    background-color: white;
    border: 1px solid ${({ theme }) => theme.colors.neutral[50]};
    `;

export const ImageBox = styled.div`
    width: 100%;
    aspect-ratio: 1 / 1; // 1대 1 비율 유지
    background-color: ${({ theme }) => theme.colors.neutral[100]};
    `;

export const InfoBox = styled.div`
    padding: 14px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    `;

export const Title = styled.div`
    color: ${({ theme }) => theme.colors.content.main};
    font-size: ${typography.size.base};
    font-weight: ${typography.weight.semibold};
    `;

export const Store = styled.span`
    color: ${({ theme }) => theme.colors.content.sub};
    font-size: ${typography.size.sm};
    font-weight: ${typography.weight.semibold};
    `;

export const Tags = styled.span`
    color: ${({ theme }) => theme.colors.content.sub};
    font-size: ${typography.size.sm};
    font-weight: ${typography.weight.regular};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    `;

export const PriceRow = styled.div`
    display: flex;
    margin-top: 10px;
    gap: 6px;
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
    gap: 8px;
    font-size: ${typography.size.xs};
    color: ${({ theme }) => theme.colors.content.sub};

    svg {
        color: ${({ theme }) => theme.colors.content.tertiary};
        width: 14px;
        height: 14px;
        vertical-align: middle;
    }
    `;
