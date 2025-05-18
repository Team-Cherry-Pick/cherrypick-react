import styled from 'styled-components';
import { textStyles } from '@/styles/global/typography';

export const ProfileEditBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
  margin-top: 80px;
  align-items: center;
  border-radius: 20px 20px 0 0;
  padding: 60px 32px 32px 32px;
  border: 1px solid ${({ theme }) => theme.colors.border.card};
  border-bottom: none;
  background-color: ${({ theme }) => theme.colors.background.card};
`;

// 텍스트 라벨
export const TextLabel = styled.p`
  ${textStyles.subtitle}
  width: 100%;
  padding-left: 4px;
  font-size: 18px;
  margin-top: 32px;
  margin-bottom: 0px;
  color: ${({ theme }) => theme.colors.content.main};
`;

// 프로필 사진 변경 영역
export const ProfileImageButton = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 60px;
  border: 1px solid ${({ theme }) => theme.colors.neutral[200]};
  background-color: ${({ theme }) => theme.colors.neutral[100]};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
`;

export const ProfileImageTitle = styled.p`
  ${textStyles.body}
  width: auto;
  height: auto;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.content.sub};
`;

// 이메일 영역
export const EmailValue = styled.p`
  ${textStyles.body}
  width: 100%;
  height: 48px;
  border: 1px solid ${({ theme }) => theme.colors.border.card};
  border-radius: 8px;
  padding: 0 16px;
  font-size: 16px;
  margin: 16px 0 0 0;
  align-content: center;
  color: ${({ theme }) => theme.colors.content.sub};
  background-color: ${({ theme }) => theme.colors.neutral[100]};
`;

// 닉네임 영역
export const InvalidNicknameHelper = styled.p`
  ${textStyles.body}
  width: 100%;
  text-align: start;
  font-size: 14px;
  margin-top: 8px;
  padding: 0 8px;
  color: ${({ theme }) => theme.colors.primary};
`;

// 성별 영역
export const GenderToggleWrapper = styled.div`
  display: flex;
  width: 100%;
  margin-top: 16px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.neutral[100]};
`;

export const GenderButton = styled.button<{ selected: boolean }>`
  width: 50%;
  height: 48px;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  &:hover {
    background-color: ${({ theme }) => theme.colors.neutral[50]};
  }
  font-weight: ${({ selected }) =>
    selected ? `600` : '400'};
  border: ${({ selected, theme }) =>
    selected ? `2px solid ${theme.colors.neutral[500]}` : 'none'};
  color: ${({ selected, theme }) =>
    selected ? theme.colors.content.main : theme.colors.content.sub};
`;

// 생년월일 영역
export const DateInput = styled.input`
  width: 100%;
  height: 48px;
  padding: 0 16px;
  font-size: 16px;
  border-radius: 8px;
  margin-top: 16px;
  border: 1px solid ${({ theme }) => theme.colors.neutral[100]};
  color: ${({ theme }) => theme.colors.content.main};
  &:focus {
    outline: none;
    border: 1px solid ${({ theme }) => theme.colors.neutral[500]};
  }
`;

// 버튼 영역
export const SubmitButton = styled.button<{ disabled?: boolean }>`
  width: 100%;
  height: 48px;
  margin: 48px 0 80px 0;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  color: white;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  background-color: ${({ theme, disabled }) =>
    disabled ? theme.colors.neutral[300] : theme.colors.primary};
  &:hover {
    opacity: 0.9;
  }
`;