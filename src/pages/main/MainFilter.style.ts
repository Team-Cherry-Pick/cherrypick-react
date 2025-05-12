import styled from 'styled-components';

export const FilterWrapper = styled.div`
  width: 20%;
  min-width: 240px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[4]};
`;

export const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SectionTitle = styled.h4`
  font-size: ${({ theme }) => theme.typography.size.base};
  font-weight: ${({ theme }) => theme.typography.weight.semibold};
  color: ${({ theme }) => theme.colors.content.main};
  line-height: ${({ theme }) => theme.typography.lineHeight.base};
  margin: 0;
`;

export const ResetText = styled.span`
  font-size: ${({ theme }) => theme.typography.size.sm};
  color: ${({ theme }) => theme.colors.content.sub};
  cursor: pointer;
`;

export const CheckboxGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[3]};
`;

export const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  font-size: ${({ theme }) => theme.typography.size.sm};
  color: ${({ theme }) => theme.colors.content.main};
  cursor: pointer;
`;

export const HiddenCheckbox = styled.input`
  display: none;
`;

export const Box = styled.div<{ checked?: boolean }>`
  width: 1.25rem;
  height: 1.25rem;
  border: 2px solid ${({ theme, checked }) =>
        checked ? theme.colors.primary : theme.colors.content.tertiary};
  border-radius: ${({ theme }) => theme.radius[1]};
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    color: ${({ theme }) => theme.colors.primary};
    width: 0.8rem;
    height: 0%.8;
  }
`;

export const Divider = styled.hr`
  border: none;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.border.board};
  margin: ${({ theme }) => theme.spacing[2]} 0;
`;

export const CategoryHead = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
`;

export const CategoryFilter = styled.button<{ $active: boolean }>`
  background: none;
  border: none;
  font-size: ${({ theme }) => theme.typography.size.sm};
  font-weight: ${({ $active, theme }) =>
        $active ? theme.typography.weight.bold : theme.typography.weight.regular};
  color: ${({ $active, theme }) =>
        $active ? theme.colors.content.main : theme.colors.content.sub};
`;

export const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.spacing[4]};
`;

export const CategoryItem = styled.button`
  background: none;
  border: none;
  font-size: ${({ theme }) => theme.typography.size.sm};
  font-weight: ${({ theme }) => theme.typography.weight.regular};
  color: ${({ theme }) => theme.colors.content.main};
  text-align: left;
  cursor: pointer;
`;

export const PriceContainer = styled.div`
  width: 100%;
`;

export const PriceInputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
`;

export const PriceInput = styled.input`
  width: 5rem;
  height: 2.25rem;
  padding: 0 ${({ theme }) => theme.spacing[1]};
  border: 1px solid ${({ theme }) => theme.colors.border.board};
  border-radius: ${({ theme }) => theme.radius[1.5]};
  background-color: ${({ theme }) => theme.colors.background.card};
  font-size: ${({ theme }) => theme.typography.size.sm};
  outline: none;
`;

export const ApplyButton = styled.button`
  width: 2.25rem;
  height: 2.25rem;
  padding: 0 ${({ theme }) => theme.spacing[2]};
  border: 1px solid ${({ theme }) => theme.colors.border.board};
  border-radius: ${({ theme }) => theme.radius[1.5]};
  font-size: ${({ theme }) => theme.typography.size.sm};
  color: ${({ theme }) => theme.colors.content.main};
`;

export const LabelRow = styled.label`
  font-size: ${({ theme }) => theme.typography.size.sm};
  font-weight: ${({ theme }) => theme.typography.weight.regular};
  color: ${({ theme }) => theme.colors.content.sub};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[1]};
`;

export const AddButton = styled.button`
  width: 67px;
  padding: ${({ theme }) => theme.spacing[2]};
  border-radius: ${({ theme }) => theme.radius[4]};
  border: 1px solid ${({ theme }) => theme.colors.border.board};
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  color: ${({ theme }) => theme.colors.content.sub};
  font-size: ${({ theme }) => theme.typography.size.sm};
  font-weight: ${({ theme }) => theme.typography.weight.regular};
`;

export const CheckboxWrapper = styled.label`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[1]};
  font-size: ${({ theme }) => theme.typography.size.sm};
  font-weight: ${({ theme }) => theme.typography.weight.regular};
  color: ${({ theme }) => theme.colors.content.sub};
  cursor: pointer;

  svg {
    color: ${({ theme }) => theme.colors.content.tertiary};
    flex-shrink: 0;
  }
`;

export const CategoryPathWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: ${({ theme }) => theme.typography.size.sm};
  color: ${({ theme }) => theme.colors.content.sub};
  margin-top: 8px;
  margin-bottom: 4px;
`;
