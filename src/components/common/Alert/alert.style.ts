import styled from 'styled-components';
import { typography } from '@/styles/global/typography';

export const AlertWrapper = styled.div<{ dark?: boolean }>`
    background-color: ${({ theme, dark }) =>
        dark ? theme.colors.neutral[20] : theme.colors.neutral[0]};
    border-radius: 20px;
    padding: 20px;
    width: 390px;
    height: 195px;
    box-sizing: border-box;
    `;

export const AlertText = styled.p<{ dark?: boolean }>`
    color: ${({ theme }) => theme.colors.content.main};
    font-size: ${typography.size.xl};
    font-weight: ${typography.weight.regular};
    margin: 12px 0 23px 0;
    word-break: break-word;
    overflow-wrap: break-word;
    white-space: normal;
    `;

export const ButtonRow = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 8px;
    `;

export const CancelButton = styled.button<{ dark?: boolean }>`
    flex: 1;
    width: 171px;
    height: 48px;
    padding: 7px 20px;
    border-radius: 8px;
    font-size: ${typography.size.base};
    font-weight: ${typography.weight.semibold};
    background-color: ${({ theme, dark }) =>
        dark ? theme.colors.neutral[200] : theme.colors.neutral[100]};
    color: ${({ theme, dark }) =>
        dark ? theme.colors.neutral[700] : theme.colors.neutral[0]};
    border: none;
    `;

export const ConfirmButton = styled.button<{ dark?: boolean }>`
    flex: 1;
    width: 171px;
    height: 48px;
    padding: 7px 20px;
    border-radius: 8px;
    font-size: ${typography.size.base};
    font-weight: ${typography.weight.semibold};
    background-color: ${({ theme, dark }) =>
        dark ? theme.colors.neutral[900] : theme.colors.neutral[900]};
    color: ${({ theme, dark }) =>
        dark ? theme.colors.neutral[0] : theme.colors.neutral[0]};
    border: none;
    `;
