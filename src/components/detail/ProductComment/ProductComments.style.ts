// components/detail/ProductComments/ProductComments.style.ts
import styled from 'styled-components';

export const Wrapper = styled.section`
  width: 65%;
  border-radius: ${({ theme }) => theme.radius[5]};
  box-shadow: 0px 0px 5px ${({ theme }) => theme.colors.border.card};
  background-color: ${({ theme }) => theme.colors.background.root};
  padding: ${({ theme }) => theme.spacing[1]} ${({ theme }) => theme.spacing[6]};
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

export const Title = styled.h2`
  font-size: ${({ theme }) => theme.typography.size.lg};
  font-weight: ${({ theme }) => theme.typography.weight.bold};
`;

export const CommentCount = styled.span`
  color: ${({ theme }) => theme.colors.content.sub};
  font-weight: ${({ theme }) => theme.typography.weight.regular};
`;

export const SortOptions = styled.div`
  font-size: ${({ theme }) => theme.typography.size.sm};
  color: ${({ theme }) => theme.colors.content.sub};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
`;

export const SortOption = styled.span<{ $selected: boolean }>`
  cursor: pointer;
  color: ${({ theme, $selected }) =>
        $selected ? theme.colors.content.main : theme.colors.content.sub};
  font-weight: ${({ $selected, theme }) =>
        $selected ? theme.typography.weight.semibold : 'normal'};
`;

export const NoComment = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.colors.content.sub};
  margin: ${({ theme }) => theme.spacing[10]} 0;
`;

export const CommentInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[2]};
  margin-top: ${({ theme }) => theme.spacing[10]};
`;

export const InputRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
`;

export const ProfileImage = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid ${({ theme }) => theme.colors.border.card};
`;

export const InputArea = styled.input`
  flex: 1;
  padding: ${({ theme }) => theme.spacing[3]};
  border-radius: ${({ theme }) => theme.radius[2]};
  border: 1px solid ${({ theme }) => theme.colors.border.card};
`;

export const SubmitButton = styled.button`
  padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[5]};
  background: ${({ theme }) => theme.colors.neutral[300]};
  color: ${({ theme }) => theme.colors.neutral[0]};
  border-radius: ${({ theme }) => theme.radius[2]};
  border: none;
  cursor: pointer;
`;
