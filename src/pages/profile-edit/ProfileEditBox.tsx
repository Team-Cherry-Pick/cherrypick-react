// pages/login/LoginBox.tsx
import PersonIcon from '@/assets/icons/person-Icon.svg';
import NicknameEditor from './NicknameEditor';
import { useState } from 'react';
import { Gender, isValidProfile, NicknameEditStatus } from '@/types/Profile';
import { newProfileAtom } from '@/store/profile';
import { useAtom } from 'jotai';
import * as S from './ProfileEditBox.style';

const ProfileEditBox = () => {

  // 프로필 Atom
  const [profile, setProfile] = useAtom(newProfileAtom);

  // 닉네임 유효성 검증 상태 State
  const [nicknameEditStatus, setNicknameEditStatus] = useState<NicknameEditStatus>(NicknameEditStatus.NONE)

  // '프로필 사진' 영역 클릭 시 호출
  const onClickBtnProfileImage = () => {
    //@todo: 프로필 사진 업로드하고 profile에 데이터 설정
  }

  // '회원가입' 또는 '수정완료' 영역 클릭 시 호출
  const onClickBtnSubmit = () => {
    //@todo: profile을 서버로 제출
  }

  return (
    <S.ProfileEditBoxWrapper>

      {/* 프로필 사진 변경 영역 */}
      <S.ProfileImageButton onClick={() => onClickBtnProfileImage()}>
        <S.ProfileImage src={PersonIcon} alt="user" />
      </S.ProfileImageButton>
      <S.ProfileImageTitle>
        프로필 사진 변경 (선택)
      </S.ProfileImageTitle>

      {/* 이메일 영역 */}
      <S.TextLabel>이메일</S.TextLabel>
      <S.EmailValue>
        don9wan@tukorea.ac.kr
      </S.EmailValue>

      {/* 닉네임 영역 */}
      <S.TextLabel>닉네임</S.TextLabel>
      <NicknameEditor editStatus={nicknameEditStatus} setEditStatus={setNicknameEditStatus} />
      {(nicknameEditStatus == NicknameEditStatus.INVALID) && (
        <S.InvalidNicknameHelper>
          유효하지 않은 닉네임입니다.
        </S.InvalidNicknameHelper>
      )}

      {/* 성별 영역 */}
      <S.TextLabel>성별</S.TextLabel>
      <S.GenderToggleWrapper>
        <S.GenderButton
          selected={profile.gender === Gender.MALE}
          onClick={() => setProfile({ ...profile, gender: Gender.MALE })}>남자</S.GenderButton>
        <S.GenderButton
          selected={profile.gender === Gender.FEMALE}
          onClick={() => setProfile({ ...profile, gender: Gender.FEMALE })}>여자</S.GenderButton>
      </S.GenderToggleWrapper>

      {/* 생년월일 영역 */}
      <S.TextLabel>생년월일</S.TextLabel>
      <S.DateInput
        type="date"
        value={profile.birthDay}
        onChange={(e) =>
          setProfile({ ...profile, birthDay: e.target.value })
        }
        min="1900-01-01"
        max="2025-12-31"
      />

      {/* 작성완료 영역 */}
      <S.SubmitButton
        onClick={onClickBtnSubmit}
        disabled={!isValidProfile(profile, nicknameEditStatus)}
      >회원가입
      </S.SubmitButton>
    </S.ProfileEditBoxWrapper>
  );
};

export default ProfileEditBox;