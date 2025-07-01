import styles from './ProfileEditPage.module.css';
import { Gender, isValidProfile, NicknameEditStatus, PutUserRes } from '@/types/Profile';
import { AccessTokenService } from '@/services/accessTokenService';
import { AccessTokenType } from '@/types/Api';
import { newProfileAtom } from '@/store/profile';
import { useAtom } from 'jotai';
import { useRef, useState } from 'react';
import { uploadImage } from '@/services/apiImage';
import { Images, UploadImageResponse } from '@/types/Image';
import NicknameEditor from './NicknameEditor';
import PersonIcon from '@/assets/icons/person-Icon.svg';
import { putUser } from '@/services/apiProfile';
import DefaultLayout from '@/components/layout/DefaultLayout';
import { postAuthRegisterCompletion } from '@/services/apiAuth';
import { useNavigate } from 'react-router-dom';

export function ProfileEditPage() {

    /**
     * @todo : registerToken도 안 넘어왔고, accessToken도 없으면 라우팅 접근 불가능하도록 설정
     */
    const navigate = useNavigate();

    // 기존 회원 여부 (회원가입 페이지 여부 결정)
    const isLoggedIn = AccessTokenService.hasToken(AccessTokenType.USER);

    // 프로필 Atom
    const [profile, setProfile] = useAtom(newProfileAtom);

    // 닉네임 유효성 검증 상태 State
    const [nicknameEditStatus, setNicknameEditStatus] = useState<NicknameEditStatus>(NicknameEditStatus.NONE);

    // 숨겨진 파일 input 참조용 Ref
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    // '프로필 사진' 영역 클릭 시 호출
    const onClickBtnProfileImage = () => {
        fileInputRef.current?.click();
    };

    // 실제 이미지 업로드 처리
    const onChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const image: Images = { images: [file], indexes: [0] };
        const result: UploadImageResponse = await uploadImage(image);
        setProfile({ ...profile, imageId: result[0].imageId, imageUrl: result[0].imageUrl });
    };

    // '회원가입' 또는 '수정완료' 버튼 클릭 시 호출
    const onClickBtnSubmit = () => {
        if (!isValidProfile(profile, nicknameEditStatus)) {
            alert('프로필을 업데이트할 수 없습니다.');
        }

        if (isLoggedIn) {
            editProfile();
        } else {
            signUp();
        }
    };

    // 회원일 시 프로필 수정 API 요청 후 프로필 갱신
    const editProfile = async () => {
        const response: PutUserRes = await putUser({
            nickname: profile.nickname,
            birthday: profile.birthDay,
            gender: profile.gender,
            imageId: profile.imageId,
        });

        setProfile({
            nickname: response.nickname,
            gender: response.gender,
            birthDay: response.birthday,
            imageId: response.imageId,
        });
    };

    // 비회원일 시 회원가입 완료 API 요청 후 프로필 갱신
    // @todo: register Token, email, redirect 들고 와서 회원가입 완료 후 뷰 이동 처리
    const signUp = async () => {
        const accessToken: string = await postAuthRegisterCompletion({
            registerToken: "",
            email: "",
            nickname: profile.nickname,
            birthday: profile.birthDay,
            gender: profile.gender,
            imageId: profile.imageId,
        });
        
        // accessToken
        if(accessToken) {
            navigate('');
        }
    }

    return (
        <DefaultLayout background="board">
            <div className={styles.container}>
                <div className={styles.profileEditBoxWrapper}>
                    {/* 이미지 선택 */}
                    <div className={styles.profileImageButton} onClick={onClickBtnProfileImage}>
                        <img className={styles.profileImage} src={profile.imageUrl?.trim() ? profile.imageUrl : PersonIcon} alt="user" />
                    </div>
                    <p className={styles.profileImageTitle}>프로필 사진 변경 (선택)</p>

                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={onChangeImage}
                    />

                    {/* 이메일 */}
                    <p className={styles.textLabel}>이메일</p>
                    <p className={styles.emailValue}></p>

                    {/* 닉네임 */}
                    <p className={styles.textLabel}>닉네임</p>
                    <NicknameEditor editStatus={nicknameEditStatus} setEditStatus={setNicknameEditStatus} />
                    {nicknameEditStatus === NicknameEditStatus.INVALID && (
                        <p className={styles.invalidNicknameHelper}>유효하지 않은 닉네임입니다.</p>
                    )}

                    {/* 성별 */}
                    <p className={styles.textLabel}>성별</p>
                    <div className={styles.genderToggleWrapper}>
                        <button
                            className={styles.genderButton}
                            data-selected={profile.gender === Gender.MALE}
                            onClick={() => setProfile({ ...profile, gender: Gender.MALE })}
                        >
                            남자
                        </button>
                        <button
                            className={styles.genderButton}
                            data-selected={profile.gender === Gender.FEMALE}
                            onClick={() => setProfile({ ...profile, gender: Gender.FEMALE })}
                        >
                            여자
                        </button>
                    </div>

                    {/* 생년월일 */}
                    <p className={styles.textLabel}>생년월일</p>
                    <input
                        className={styles.dateInput}
                        type="date"
                        value={profile.birthDay ?? ''}
                        onChange={(e) => setProfile({ ...profile, birthDay: e.target.value })}
                        min="1900-01-01"
                        max="2025-12-31"
                    />

                    {/* 회원가입/프로필수정 버튼 */}
                    <button
                        className={styles.submitButton}
                        onClick={onClickBtnSubmit}
                        disabled={!isValidProfile(profile, nicknameEditStatus)}
                    >
                        {isLoggedIn ? '프로필 수정완료' : '회원가입 완료'}
                    </button>
                </div>
            </div>
        </DefaultLayout>
    );
}

export default ProfileEditPage;