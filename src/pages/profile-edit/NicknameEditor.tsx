// pages/login/LoginBox.tsx
import styled, { useTheme } from 'styled-components';
import { TextInput } from '@/components/common/Input';
import { currentProfileAtom, newProfileAtom } from '@/store/profile';
import { useAtom, useAtomValue } from 'jotai';
import { GetNicknameValidationRes, NicknameEditStatus } from '@/types/Profile';
import { getNicknameValidation } from '@/services/apiProfile';
import { AccessTokenService } from '@/services/accessTokenService';
import { AccessTokenType } from '@/types/Api';

interface NicknameEditorProps {
    editStatus: NicknameEditStatus,
    setEditStatus: React.Dispatch<React.SetStateAction<NicknameEditStatus>>,
}

const NicknameEditor = ({ editStatus, setEditStatus }: NicknameEditorProps) => {
    const theme = useTheme();

    // 프로필 Atom
    const [newProfile, setNewProfile] = useAtom(newProfileAtom);
    const currentProfile = useAtomValue(currentProfileAtom);

    // 닉네임 입력값 변경 시 호출
    const onChangeNickname = (newNickname: string) => {
        const nicknameRegex = /^[ㄱ-ㅎ가-힣a-zA-Z0-9]*$/;
        if (!nicknameRegex.test(newNickname)) return;

        if (newNickname.length > 10) return;

        // 회원 && 기존 닉네임과 동일한 경우
        if (AccessTokenService.hasToken(AccessTokenType.USER) && newNickname === currentProfile.nickname) {
            setEditStatus(NicknameEditStatus.VALID);
            setNewProfile({ ...newProfile, nickname: newNickname });
            return;
        }

        // 기존 닉네임과 동일하지 않은 경우
        if (newNickname.length < 2) {
            setEditStatus(NicknameEditStatus.NONE);
        } else if (editStatus !== NicknameEditStatus.EDITING) {
            setEditStatus(NicknameEditStatus.EDITING);
        }

        setNewProfile({ ...newProfile, nickname: newNickname });
    };

    // '중복검사' 버튼 클릭 시 호출
    const onClickBtnValidateNickname = async () => {
        const isEditing: boolean = (editStatus == NicknameEditStatus.EDITING);
        const newNickname: string = newProfile.nickname;

        if (isEditing) {
            const response: GetNicknameValidationRes = await getNicknameValidation(newNickname)
            const isValidNickname: boolean = response.isValid;

            // 서버로부터 검증 받은 닉네임 반영
            setNewProfile({ ...newProfile, nickname: response.nickname });

            if (isValidNickname) {
                setEditStatus(NicknameEditStatus.VALID);
            } else {
                setEditStatus(NicknameEditStatus.INVALID);
                alert(response.details);
            }
        }
    }

    // 닉네임 유효성 검증 색상 변경 CSS
    const getNicknameInputCSS = (editStatus: NicknameEditStatus): React.CSSProperties => {
        return {
            color: (editStatus == NicknameEditStatus.INVALID) ? theme.colors.primary : theme.colors.content.main,
            border: (editStatus == NicknameEditStatus.INVALID) ? `1px solid ${theme.colors.primary}` : `1px solid ${theme.colors.neutral[100]}`,
        };
    };

    return (
        <NicknameEditorWrapper>
            {/* 닉네임 입력 필드 */}
            <TextInput
                placeholder="닉네임 입력"
                value={newProfile?.nickname}
                onChange={(e) => onChangeNickname(e.target.value)}
                onPaste={(e) => e.preventDefault()}
                style={getNicknameInputCSS(editStatus)}
            />
            {/* 중복검사 버튼 */}
            <NicknameCheckButton
                editStatus={editStatus}
                onClick={() => onClickBtnValidateNickname()}
                disabled={editStatus != NicknameEditStatus.EDITING}
            >
                {(editStatus == NicknameEditStatus.VALID) ? "검사완료" : "중복검사"}
            </NicknameCheckButton>
        </NicknameEditorWrapper>
    );
};

export default NicknameEditor;

const NicknameEditorWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: auto;
  margin-top: 16px;
  gap: 8px;
`;

// '중복검사' 버튼
const NicknameCheckButton = styled.button<{ editStatus: NicknameEditStatus }>`
  width: 108px;
  height: 48px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  &:disabled {
    cursor: not-allowed;
  }
  
  color: ${({ theme, editStatus }) => {
        if (editStatus == NicknameEditStatus.EDITING) return theme.colors.neutral[0];
        return 'white';
    }};
  background-color: ${({ theme, editStatus }) => {
        if (editStatus == NicknameEditStatus.EDITING) return theme.colors.content.main;
        return theme.colors.neutral[300];
    }};
`;