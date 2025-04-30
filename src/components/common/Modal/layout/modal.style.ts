import styled from 'styled-components';
import { typography } from '@/styles/global/typography';

export const ModalWrapper = styled.div`
    width: 30vw;
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

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(51, 51, 51, 0.4);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContainer = styled.div`
  z-index: 1001;
  background-color: white;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
`;
