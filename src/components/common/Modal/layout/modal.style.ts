import styled from 'styled-components';
import { typography } from '@/styles/global/typography';

export const ModalWrapper = styled.div`
    width: 390px;
    height: auto;
    flex-shrink: 0;
    border-radius: 20px;
    background-color: ${({ theme }) => theme.colors.neutral[0]};
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    position: relative;
    `;

export const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.neutral[100]};
    `;

export const ModalTitle = styled.h2`
    font-size: ${typography.size.lg};
    font-weight: ${typography.weight.semibold};
    color: ${({ theme }) => theme.colors.content.main};
    font-family: 'Pretendard', sans-serif;
    margin: 0;
    `;

export const CloseButton = styled.button`
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;

    svg,
    img {
        width: 16px;
        height: 16px;
        fill: ${({ theme }) => theme.colors.content.sub};
    }
    `;

export const ModalBody = styled.div`
    flex: 1;
    overflow-y: auto;
    font-size: ${typography.size.sm};
    font-weight: ${typography.weight.regular};
    color: ${({ theme }) => theme.colors.content.main};
    font-family: 'Pretendard', sans-serif;
    line-height: 1.5;
    `;
