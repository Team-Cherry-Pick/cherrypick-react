// components/detail/ProductComments/ProductComments.style.ts
import styled from 'styled-components';

export const Wrapper = styled.section`
  border-radius: ${({ theme }) => theme.radius[5]};
  box-shadow: 0px 0px 5px ${({ theme }) => theme.colors.border.card};
  background-color: ${({ theme }) => theme.colors.background.root};
  padding: 2rem 1.25rem;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

export const Title = styled.h3`
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
`;

export const InputRow = styled.div`
  display: flex;
`;

export const SubmitButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
    gap: ${({ theme }) => theme.spacing[2]};
  margin-top: ${({ theme }) => theme.spacing[2]};
`;

export const ProfileImage = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid ${({ theme }) => theme.colors.border.card};
`;

export const InputArea = styled.textarea`
  width: 100%;
  padding: ${({ theme }) => theme.spacing[3]};
  border-radius: ${({ theme }) => theme.radius[2]};
  border: 1px solid ${({ theme }) => theme.colors.border.card};
  background-color: ${({ theme }) => theme.colors.neutral[20]};
  color: ${({ theme }) => theme.colors.content.main};
  resize: none;
  min-height: 60px;
  line-height: 1.5;
  font-size: ${({ theme }) => theme.typography.size.base};

  &::placeholder {
    color: ${({ theme }) => theme.colors.content.sub};
  }
`;

export const SubmitButton = styled.button<{ disabled?: boolean }>`
  padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[4]};
  font-size: ${({ theme }) => theme.typography.size.sm};
  font-weight: ${({ theme }) => theme.typography.weight.bold};
  border-radius: ${({ theme }) => theme.radius[2]};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  background: ${({ theme, disabled }) =>
    disabled ? theme.colors.neutral[300] : theme.colors.neutral[800]};
  color: ${({ theme }) => theme.colors.neutral[20]};
  transition: background 0.2s;

  &:hover {
    background: ${({ theme, disabled }) =>
    !disabled && theme.colors.neutral[700]};
  }
`;

export const CancelButton = styled.button`
  padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[4]};
  font-size: ${({ theme }) => theme.typography.size.sm};
  font-weight: ${({ theme }) => theme.typography.weight.bold};
  border-radius: ${({ theme }) => theme.radius[2]};
  border: 1px solid ${({ theme }) => theme.colors.neutral[300]};
  background-color: ${({ theme }) => theme.colors.background.root};
  color: ${({ theme }) => theme.colors.content.sub};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.neutral[100]};
  }
`;

export const Divider = styled.hr`
  border: none;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.border.card};
  margin: 1rem 0;
  width: 100%;
  margin-left: 0;
  padding: 0;
`;

export const ItemDivider = styled.span`
  margin: 0 ${({ theme }) => theme.spacing[1]};
`;

export const CommentList = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing[2]};
`;

export const CommentItem = styled.div`
    display: flex;
    align-items: flex-start;
`;

export const CommentContent = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    margin: 0;
    color: ${({ theme }) => theme.colors.content.main};
`;

export const UserName = styled.div`
    font-weight: ${({ theme }) => theme.typography.weight.bold};
    margin-bottom: ${({ theme }) => theme.spacing[1]};
`;

export const FallbackIcon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.neutral[100]};
    color: ${({ theme }) => theme.colors.content.sub};
    margin-right: ${({ theme }) => theme.spacing[3]};
`;

export const CommentText = styled.p`
    margin: ${({ theme }) => theme.spacing[1]} 0;
`;

export const CommentFooter = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: ${({ theme }) => theme.spacing[2]};
    gap: ${({ theme }) => theme.spacing[2]};
    font-size: ${({ theme }) => theme.typography.size.sm};
    color: ${({ theme }) => theme.colors.content.sub};
`;

export const Likes = styled.div`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing[1]};
    font-size: ${({ theme }) => theme.typography.size.sm};
    color: ${({ theme }) => theme.colors.content.sub};
`;

export const Reply = styled.div`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing[1]};
    font-size: ${({ theme }) => theme.typography.size.sm};
    color: ${({ theme }) => theme.colors.content.sub};
`;

export const LeftSection = styled.div`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing[2]};
`;

export const RightSection = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
    height: 48px;
`;

export const CommentTime = styled.span`
    font-size: ${({ theme }) => theme.typography.size.sm};
    color: ${({ theme }) => theme.colors.content.sub};
`;

export const DeleteButton = styled.button`
  font-size: ${({ theme }) => theme.typography.size.sm};
  color: ${({ theme }) => theme.colors.content.sub};
  background: none;
  border: none;
  cursor: pointer;
  margin-bottom: 4px;
  text-decoration: underline;
  text-underline-offset: 2px;
`;

export const ReplyDivider = styled.hr`
  border: none;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.border.card};
  margin: 1rem 0;
  width: calc(100% - 3rem);
  margin-left: 3rem;
  padding: 0;
`;