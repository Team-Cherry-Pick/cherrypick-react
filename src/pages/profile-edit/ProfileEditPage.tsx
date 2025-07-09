import styles from './ProfileEditPage.module.css';
import { Gender, GetUserRes, isValidProfile, NicknameEditStatus, User } from '@/types/Profile';
import { AccessTokenService } from '@/services/accessTokenService';
import { AccessTokenType } from '@/types/Api';
import { currentProfileAtom, newProfileAtom } from '@/store/profile';
import { useAtom, useSetAtom } from 'jotai';
import { useEffect, useRef, useState } from 'react';
import { uploadImage } from '@/services/apiImage';
import { Images, UploadImageResponse } from '@/types/Image';
import NicknameEditor from './NicknameEditor';
import PersonIcon from '@/assets/icons/person-Icon.svg';
import { getUser, putUser } from '@/services/apiProfile';
import DefaultLayout from '@/components/layout/DefaultLayout';
import { postAuthRegisterCompletion } from '@/services/apiAuth';
import { useLocation, useNavigate } from 'react-router-dom';
import { UpdateDTO } from '@/types/Auth';

export function ProfileEditPage() {

    // @todo : registerToken도 안 넘어왔고, accessToken도 없으면 라우팅 접근 불가능하도록 설정
    const navigate = useNavigate();
    const location = useLocation();

    //************************************************ INIT DATA **************************************************//

    // 프로필 Atom (신-구)
    const [newProfile, setNewProfile] = useAtom(newProfileAtom);
    const [currentProfile, setCurrentProfile] = useAtom(currentProfileAtom);

    // 회원가입 시퀀스일 경우 리다이렉트 페이지에서 넘어오는 변수 세팅
    const { registerTokenState = "", redirectPathState = "", emailState = "" } = location.state || {};
    const registerToken: string = registerTokenState;
    const redirectPath: string = redirectPathState;
    const email: string = emailState;

    // 비회원, 회원에 따라 처리
    const isSignUpPage = !AccessTokenService.hasToken(AccessTokenType.USER) && registerToken && redirectPath && email;
    if (email) setNewProfile(prev => ({ ...prev, email }));
    const [nicknameEditStatus, setNicknameEditStatus] = useState<NicknameEditStatus>(isSignUpPage ? NicknameEditStatus.NONE : NicknameEditStatus.VALID);

    // 정보수정 시퀀스일 경우 API 호출하여 기존 프로필 정보 세팅
    useEffect(() => {
        const initProfile = async () => {
            const isProfileEditPage = AccessTokenService.hasToken(AccessTokenType.USER);
            if (isProfileEditPage) {
                const currentUser: GetUserRes = await getUser();
                setNewProfile(currentUser);
                setCurrentProfile(currentUser)
            }
        };
        initProfile();
    }, []);

    //************************************************ UseRef **************************************************//

    // '날짜 선택' 영역 클릭 시 호출되는 Ref
    const dateInputRef = useRef<HTMLInputElement>(null);
    const onClickDateInputDiv = () => {
        void (dateInputRef.current?.showPicker?.() || dateInputRef.current?.focus());
    };

    // '프로필 사진' 영역 클릭 시 호출되는 Ref
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const onClickBtnProfileImage = () => {
        fileInputRef.current?.click();
    };

    //************************************************ API **************************************************//

    // 이미지 업로드 API 요청 후 이미지 갱신
    const onChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const image: Images = { images: [file], indexes: [0] };
        const result: UploadImageResponse = await uploadImage(image);
        setNewProfile({ ...newProfile, imageId: result[0].imageId, imageURL: result[0].imageUrl });
    };

    // '회원가입' 또는 '수정완료' 버튼 클릭 시 호출
    const onClickBtnSubmit = () => {
        if (!isValidProfile(newProfile, currentProfile, nicknameEditStatus)) {
            alert('프로필을 업데이트할 수 없습니다.');
        }

        if (isSignUpPage) {
            signUp();
        } else {
            editProfile();
        }
    };

    // 회원일 시 프로필 수정 API 요청 후 프로필 갱신
    const editProfile = async () => {
        // @todo: API 오작동 확인
        const currentProfile: User = await putUser({
            nickname: newProfile.nickname,
            birthday: newProfile.birthday,
            gender: newProfile.gender,
            imageId: newProfile.imageId,
        });

        if (currentProfile) {
            setCurrentProfile(currentProfile);
        }
    };

    // 비회원일 시 회원가입 완료 API 요청 후 프로필 갱신
    const signUp = async () => {

        const updateDTO: UpdateDTO = {
            nickname: newProfile.nickname,
            birthday: newProfile.birthday,
            gender: newProfile.gender,
            imageId: newProfile.imageId,
            email: email,
        };

        const accessToken: string = await postAuthRegisterCompletion({
            registerToken: registerToken,
            updateDTO: updateDTO,
        });

        if (accessToken) {
            // @todo: 프로필 갱신
            AccessTokenService.save(AccessTokenType.USER, accessToken);
            navigate(redirectPath);
        }
    }

    //************************************************ VIEW **************************************************//

    return (
        <DefaultLayout background="board">
            <div className={styles.container}>
                <div className={styles.profileEditBoxWrapper}>
                    {/* 이미지 선택 */}
                    <div className={styles.profileImageButton} onClick={onClickBtnProfileImage}>
                        <img className={styles.profileImage} src={newProfile.imageURL?.trim() ? newProfile.imageURL : PersonIcon} alt="user" />
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
                    <p className={styles.emailValue}>{newProfile.email}</p>

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
                            data-selected={newProfile.gender === Gender.MALE}
                            onClick={() => setNewProfile({ ...newProfile, gender: Gender.MALE })}
                        >
                            남자
                        </button>
                        <button
                            className={styles.genderButton}
                            data-selected={newProfile.gender === Gender.FEMALE}
                            onClick={() => setNewProfile({ ...newProfile, gender: Gender.FEMALE })}
                        >
                            여자
                        </button>
                    </div>

                    {/* 생년월일 */}
                    <p className={styles.textLabel}>생년월일</p>
                    <div
                        className={styles.dateInputWrapper}
                        onClick={onClickDateInputDiv}
                        style={{ display: 'inline-block' }}
                    >
                        <input
                            ref={dateInputRef}
                            className={styles.dateInput}
                            type="date"
                            value={newProfile.birthday ?? ''}
                            onChange={(e) => setNewProfile({ ...newProfile, birthday: e.target.value })}
                            min="1900-01-01"
                            max={new Date().toISOString().split('T')[0]}

                        />
                    </div>

                    {/* 회원가입/프로필수정 버튼 */}
                    <button
                        className={styles.submitButton}
                        onClick={onClickBtnSubmit}
                        disabled={!isValidProfile(newProfile, currentProfile, nicknameEditStatus)}
                    >
                        {isSignUpPage ? '회원가입 완료' : '프로필 수정완료'}
                    </button>
                </div>
            </div>
        </DefaultLayout>
    );
}

export default ProfileEditPage;