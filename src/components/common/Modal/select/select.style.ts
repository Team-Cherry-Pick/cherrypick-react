import styled from 'styled-components';
import { typography } from '@/styles/global/typography';

/* ------------------ 공통 ------------------ */
export const selectWrapper = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    height: 100%;
`;

export const textGuideStore = styled.div`
    margin: 24px auto;
    padding: 100px 0;
    color: ${({ theme }) => theme.colors.content.sub};
    font-size: ${typography.size.sm};
    font-weight: ${typography.weight.regular};
    text-align: center;
    white-space: pre-line;
`;

export const containerFooterSelect = styled.div`
    border-top: 0.5px solid ${({ theme }) => theme.colors.neutral[300]};
    background: ${({ theme }) => theme.colors.neutral[0]};
    width: 100%;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
`;

/* ------------------ 스토어 ------------------ */

export const listStoreSelect = styled.ul`
    list-style: none;
    padding: 0;
    margin-top: 0;
    flex: 1;
    overflow-y: auto;

    scrollbar-width: thin;
    &::-webkit-scrollbar {
        width: 6px;
    }
    &::-webkit-scrollbar-thumb {
        background: ${({ theme }) => theme.colors.neutral[100]};
        border-radius: 3px;
    }
    &::-webkit-scrollbar-track {
        background: transparent;
    }
`;

export const itemSelectStore = styled.li`
    padding: 14px 0;
    font-size: ${typography.size.base};
    font-weight: ${typography.weight.regular};
    color: ${({ theme }) => theme.colors.content.main};
    font-family: 'Pretendard', sans-serif;
    cursor: pointer;

    &:last-child {
        border-bottom: none;
    }
`;

/* ------------------ 카테고리 ------------------ */

export const textSubheaderCategory = styled.div`
    font-size: ${typography.size.sm};
    font-weight: ${typography.weight.regular};
    color: ${({ theme }) => theme.colors.content.sub};
    cursor: pointer;
    margin: 4px 0;
`;

export const listCategorySelect = styled.ul`
    list-style: none;
    display: flex;
    flex-direction: column;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    padding: 0;
    margin: 20px 0;
`;

export const itemCategorySelect = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: ${typography.size.base};
    font-weight: ${typography.weight.regular};
    color: ${({ theme }) => theme.colors.content.main};
    cursor: pointer;
`;

export const textGoBackCategory = styled.div`
    font-size: ${typography.size.sm};
    font-weight: ${typography.weight.regular};
    color: ${({ theme }) => theme.colors.content.sub};
    cursor: pointer;
`;

export const textArrowCategory = styled.span`
    font-size: ${typography.size.base};
    color: ${({ theme }) => theme.colors.content.sub};
`;

/* ------------------ 할인방식 ------------------ */

export const containerDiscountSelected = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    padding: 16px 20px;
    background-color: ${({ theme }) => theme.colors.neutral[100]};
    min-height: 48px;
    align-items: center;
`;

export const tagSelected = styled.div`
    display: flex;
    align-items: center;
    background-color: ${({ theme }) => theme.colors.neutral[0]};
    color: ${({ theme }) => theme.colors.content.main};
    font-size: ${typography.size.sm};
    font-weight: ${typography.weight.regular};
    border-radius: 20px;
    border: 1px solid ${({ theme }) => theme.colors.neutral[200]};
    padding: 8px 12px;
    gap: 8px;
`;

export const buttonRemoveTag = styled.button`
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    font-size: 14px;
    color: ${({ theme }) => theme.colors.content.sub};
`;

export const selectContainerSearch = styled.div`
    background: ${({ theme }) => theme.colors.neutral[0]};
    width: 100%;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    margin: 0;
    padding: 0;
`;

export const listDiscountSelect = styled.ul`
    list-style: none;
    padding: 0;
    padding-right: 12px;
    margin-top: 0;
    flex: 1;
    max-height: 320px;
    overflow-y: scroll;
    padding-top: 10px;

    scrollbar-width: thin; // Firefox
    &::-webkit-scrollbar {
        width: 6px;
    }
    &::-webkit-scrollbar-thumb {
        background: ${({ theme }) => theme.colors.neutral[100]};
        border-radius: 3px;
    }
    &::-webkit-scrollbar-track {
        background: transparent;
    }
`;

interface ItemDiscountSelectProps {
    selected: boolean;
}

export const ItemDiscountSelect = styled.li<ItemDiscountSelectProps>`
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: ${typography.size.base};
    font-weight: ${typography.weight.regular};
    font-family: 'Pretendard', sans-serif;
    cursor: pointer;

    img {
        width: 16px;
        height: 16px;
        flex-shrink: 0;
    }
`;

export const labelDiscount = styled.span<{ selected?: boolean }>`
    color: ${({ selected, theme }) =>
        selected ? theme.colors.primary : theme.colors.content.main};
`;

export const containerFooter = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
    padding: 20px;
    box-sizing: border-box;
    width: 100%;
    background: ${({ theme }) => theme.colors.neutral[0]};
    border-top: 0.5px solid ${({ theme }) => theme.colors.neutral[300]};
`;

export const buttonResetDiscount = styled.button`
    background: none;
    color: ${({ theme }) => theme.colors.content.sub};
    font-size: ${typography.size.base};
    font-weight: ${typography.weight.regular};
    border: none;
    border-radius: 8px;
    cursor: pointer;
    padding: 14px 20px;
`;

export const buttonConfirmDiscount = styled.button<{ active: boolean }>`
    flex: 1;
    background: ${({ active, theme }) =>
        active ? theme.colors.neutral[900] : theme.colors.neutral[300]};
    color: ${({ active, theme }) =>
        active ? theme.colors.neutral[0] : theme.colors.neutral[100]};
    font-size: ${typography.size.base};
    font-weight: ${typography.weight.semibold};
    border: none;
    border-radius: 8px;
    padding: 14px 0;
    cursor: pointer;
`;

export const CategoryGrid = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  padding: 0;
  margin: 20px 0;
`;

export const CategoryItem = styled.li<{ $active?: boolean }>`
  font-size: ${typography.size.base};
  font-weight: ${typography.weight.regular};
  color: ${({ theme, $active }) =>
        $active ? theme.colors.primary : theme.colors.content.main};
  background-color: ${({ theme, $active }) =>
        $active ? theme.colors.neutral[100] : 'transparent'};
  padding: 12px 16px;
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.neutral[100]};
  }
`;
