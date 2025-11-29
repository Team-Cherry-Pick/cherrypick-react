// components/detail/HeatFeedback/HeatFeedback.style.ts
import styled, { css } from 'styled-components';

export const Container = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const ThumbWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const baseButton = css`
  width: 3rem;
  height: 3rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  svg {
    width: 1rem;
    height: 1rem;
    display: block;
  }
`;

export const LikeBtn = styled.button<{ $active?: boolean }>`
  ${baseButton}
  background-color: ${({ $active, theme }) =>
    $active ? theme.colors.primaryLayer[500] : 'transparent'};
  color: ${({ $active, theme }) =>
    $active ? '#ffffff' : theme.colors.content.sub};
  border: 1px solid ${({ theme }) => theme.colors.neutral[100]};
  font-weight: ${({ theme }) => theme.typography.weight.regular};
`;

export const DislikeBtn = styled.button<{ $active?: boolean }>`
  ${baseButton}
  background-color: ${({ $active, theme }) =>
    $active ? '#5670BB' : 'transparent'};
  color: ${({ $active, theme }) =>
    $active ? '#ffffff' : theme.colors.content.sub};
  border: 1px solid ${({ theme }) => theme.colors.neutral[100]};
  font-weight: ${({ theme }) => theme.typography.weight.regular};
`;

export const HeatWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

export const Heat = styled.span`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.content.sub};
`;

export const DislikeModal = styled.ul`
  position: absolute;
  top: 3rem;
  right: 0;
  background-color: ${({ theme }) => theme.colors.background.root};
  border-radius: ${({ theme }) => theme.radius[2]};
  border: 1px solid ${({ theme }) => theme.colors.neutral[100]};
  box-shadow: 0 0 0.3rem rgba(0, 0, 0, 0.3);
  padding: 1px 0.5rem;
  width: 11rem;
  list-style: none;
  z-index: 10;

  li {
    padding: 0.75rem 1rem;
    color: ${({ theme }) => theme.colors.content.sub};
    font-size: 0.9rem;
    text-align: left;
    background: none;
    border: none;
    width: 100%;
    cursor: pointer;
  }
  li + li {
    border-top: 1px solid ${({ theme }) => theme.colors.border.card};
  }
`;

export const VoteTooltip = styled.div`
  position: absolute;
  top: calc(100% + 0.5rem);
  left: 50%;
  transform: translateX(-50%);
  background-color: #ff4e50ff;
  color: white;
  padding: 0.625rem 1rem;
  border-radius: 1.25rem;
  font-size: 0.875rem;
  font-weight: 500;
  white-space: nowrap;
  cursor: pointer;
  z-index: 10;
  box-shadow: 0 2px 8px rgba(255, 77, 79, 0.3);
  
  /* 말풍선 꼬리 */
  &::before {
    content: '';
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 6px solid transparent;
    border-bottom-color: #FF4D4F;
  }
  
  &:hover {
    background-color: #FF6B6D;
  }
`;
