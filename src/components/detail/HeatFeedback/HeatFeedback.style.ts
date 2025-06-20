// components/detail/HeatFeedback/HeatFeedback.style.ts
import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.neutral[0]};
  border-radius: 999rem;
  padding: 0.5rem;
  position: relative;
  gap: 1rem;
    border: 1px solid ${({ theme }) => theme.colors.neutral[100]};
`;

export const ThumbWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const baseButton = css`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    width: 1em;
    height: 1rem;
    display: block;
  }
`;

export const LikeBtn = styled.button<{ $active?: boolean }>`
  ${baseButton}
  background-color: ${({ $active, theme }) =>
        $active ? theme.colors.primaryLayer[500] : theme.colors.neutral[50]};
  color: ${({ $active, theme }) =>
        $active ? '#ffffff' : theme.colors.primaryLayer[300]};
`;

export const DislikeBtn = styled.button<{ $active?: boolean }>`
  ${baseButton}
  background-color: ${({ $active, theme }) =>
        $active ? '#5670BB' : theme.colors.neutral[50]};
  color: ${({ $active }) => ($active ? '#ffffff' : '#98B2E8')};
`;

export const HeatWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  position: relative;
`;

export const Heat = styled.span`
  font-size: ${({ theme }) => theme.typography.size.base};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.content.main};
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
