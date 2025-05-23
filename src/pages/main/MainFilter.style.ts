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
  text-decoration: underline;
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

export const CategoryListWrapper = styled.div`
    width: 100%;
`;

export const StepItem = styled.span<{ $isLast: boolean }>`
  display: inline;
  color: ${({ theme, $isLast }) =>
        $isLast ? theme.colors.primary : theme.colors.content.sub};
  font-weight: ${({ theme, $isLast }) =>
        $isLast ? theme.typography.weight.bold : theme.typography.weight.regular};
  cursor: ${({ $isLast }) => ($isLast ? 'default' : 'pointer')};
  white-space: normal;
  word-break: keep-all;

  &::before {
    content: ${({ $isLast }) => ($isLast ? "''" : "' > '")};
    color: ${({ theme }) => theme.colors.content.sub};
  }

  &:first-of-type::before {
    content: '';
  }
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
  min-width: 67px; /* 고정 크기 */
  height: 36px; /* 세로 높이 고정 */
  padding: 0 ${({ theme }) => theme.spacing[3]};
  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.colors.border.board};
  display: inline-flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.content.sub};
  font-size: ${({ theme }) => theme.typography.size.sm};
  font-weight: ${({ theme }) => theme.typography.weight.regular};
  background: none;
  cursor: pointer;
  white-space: nowrap;
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

export const InputListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing[2]};
  align-items: center;
`;

export const InputItem = styled.div`
  display: inline-flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[3]};
  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.colors.border.board};
  background-color: ${({ theme }) => theme.colors.background.card};
  font-size: ${({ theme }) => theme.typography.size.sm};
  max-width: 100%;
  height: 36px;

  input {
    all: unset;
    min-width: 40px;
    max-width: 120px;
    width: auto;
    font-size: inherit;
    background: transparent;
    outline: none;
  }

  button {
    all: unset;
    margin-left: ${({ theme }) => theme.spacing[1]};
    cursor: pointer;
    color: ${({ theme }) => theme.colors.content.sub};
  }
`;
