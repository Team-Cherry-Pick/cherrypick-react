import styles from './ProfileEditPage.module.css';
import { Gender, GetUserRes, isValidProfile, NicknameEditStatus, User } from '@/types/Profile';
import { AccessTokenService } from '@/services/accessTokenService';
import { currentProfileAtom, newProfileAtom } from '@/store/profile';
import { useAtom } from 'jotai';
import { useEffect, useRef, useState } from 'react';
import { uploadImage } from '@/services/apiImage';
import { Images, UploadImageResponse } from '@/types/Image';
import NicknameEditor from './NicknameEditor';
import PersonIcon from '@/assets/icons/person-Icon.svg';
import { getUser, patchUser, postBetaTesterBadge } from '@/services/apiProfile';
import DefaultLayout from '@/components/layout/DefaultLayout';
import { deleteUser, postAuthRegisterCompletion } from '@/services/apiAuth';
import { useLocation, useNavigate } from 'react-router-dom';
import { DeleteUserRes, PostAuthRegisterCompletionReq } from '@/types/Auth';
import { useRefreshProfile } from '@/hooks/useRefreshProfile';
import { getBetaTesterIntent, setBetaTesterIntent } from '@/store/betaTester';
import { FaRegSquare, FaCheckSquare } from "react-icons/fa";
import useIsMobileViewport from '@/hooks/useIsMobileViewport';
import { GA4Events, trackCustomEvent } from '@/utils/ga4';
import { validateBirthday, formatBirthdayInput, convertDateToInput } from '@/utils/birthday';

export function ProfileEditPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const isMobile = useIsMobileViewport();

    // registerToken도 안 넘어왔고, accessToken도 없으면 라우팅 접근 불가능하도록 설정
    useEffect(() => {
        const hasAccessToken = AccessTokenService.hasToken();
        const hasRegisterToken = location.state?.registerTokenState;

        // 둘 다 없으면 접근 차단
        if (!hasAccessToken && !hasRegisterToken) {
            alert('잘못된 접근입니다.');
            navigate('/login', { replace: true });
        }
    }, [navigate, location.state]);

    //************************************************ INIT DATA **************************************************//

    // 프로필 Atom (신-구)
    const [newProfile, setNewProfile] = useAtom(newProfileAtom);
    const [currentProfile, setCurrentProfile] = useAtom(currentProfileAtom);

    // 프로필 갱신 Hook
    const { refreshProfile } = useRefreshProfile();

    // 회원가입 시퀀스일 경우 리다이렉트 페이지에서 넘어오는 변수 세팅
    const { registerTokenState = "", redirectPathState = "", emailState = "" } = location.state || {};
    const registerToken: string = registerTokenState;
    const redirectPath: string = redirectPathState;
    const email: string = emailState;

    // 비회원, 회원에 따라 처리
    const isSignUpPage = !AccessTokenService.hasToken() && registerToken && redirectPath && email;
    const [nicknameEditStatus, setNicknameEditStatus] = useState<NicknameEditStatus>(isSignUpPage ? NicknameEditStatus.NONE : NicknameEditStatus.VALID);

    // (기회원) API 호출하여 기존 프로필 정보 세팅 (비회원) email을 profile에 세팅
    useEffect(() => {
        const initProfile = async () => {
            const isProfileEditPage = AccessTokenService.hasToken();
            if (isProfileEditPage) {
                const currentUser: GetUserRes = await getUser();
                setNewProfile(currentUser);
                setCurrentProfile(currentUser)
            }
            if (email) {
                setNewProfile(prev => ({ ...prev, email }));
            }
        };
        initProfile();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // 이용약관, 개인정보처리방침, 14세 이상 동의 항목 State 세팅
    const [agreements, setAgreements] = useState({
        isAgreedTerm: false,
        isAgreedPrivacy: false,
        isAgreedAgeVerified: false,
    });

    // 생년월일 입력 관련 상태
    const [birthdayInput, setBirthdayInput] = useState('');
    const [birthdayError, setBirthdayError] = useState('');

    // 생년월일 입력 핸들러
    const handleBirthdayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const formatted = formatBirthdayInput(value);
        setBirthdayInput(formatted);

        const validation = validateBirthday(formatted);
        setBirthdayError(validation.errorMessage);

        if (validation.isValid) {
            setNewProfile({ ...newProfile, birthday: validation.formattedDate });
        } else if (!formatted.trim()) {
            setNewProfile({ ...newProfile, birthday: '' });
        }
    };

    // 프로필 로드 시 생년월일 입력 필드 초기화
    useEffect(() => {
        if (newProfile.birthday) {
            setBirthdayInput(convertDateToInput(newProfile.birthday));
        }
    }, [newProfile.birthday]);

    // 신규 프로필 데이터 유효성, 닉네임 유효성, 이용약관 전원 동의 여부 체크 메서드
    const isValidProfileWithAgreements = () => {

        // 회원/비회원 상관 없이 프로필 데이터 유효성 검증
        if (!isValidProfile(newProfile, currentProfile, nicknameEditStatus)) {
            return false;
        }

        // 회원정보 수정(회원)일 시, 프로필 데이터 유효성만 검증 
        if (AccessTokenService.hasToken()) {
            return true;
        }

        // 회원가입(비회원)일 시, 이용동의까지 검증
        return agreements.isAgreedTerm && agreements.isAgreedPrivacy && agreements.isAgreedAgeVerified;
    };

    //************************************************ View Event **************************************************//



    // '프로필 사진' 영역 클릭 시 호출되는 Ref
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const onClickBtnProfileImage = () => {
        fileInputRef.current?.click();
    };

    // 이미지 업로드 API 요청 후 이미지 갱신
    const onChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const image: Images = { images: [file], indexes: [0] };
        const result: UploadImageResponse = await uploadImage(image);
        setNewProfile({ ...newProfile, imageId: result[0].imageId, imageURL: result[0].imageUrl });
    };

    // 이미지 삭제
    const onClickBtnDeleteImage = () => {
        setNewProfile(prev => ({ ...prev, imageURL: "", imageId: -1, }));
    };

    // '이용약관' 동의 항목 클릭 시 호출
    const onClickBoxAgreedTerm = () => {
        setAgreements((prev) => ({ ...prev, isAgreedTerm: !agreements.isAgreedTerm }));
    }

    // '개인정보처리방침' 동의 항목 클릭 시 호출
    const onClickBoxAgreedPrivacy = () => {
        setAgreements((prev) => ({ ...prev, isAgreedPrivacy: !agreements.isAgreedPrivacy }));
    }

    // '14세 이상' 동의 항목 클릭 시 호출
    const onClickBoxAgreedAgeVerified = () => {
        setAgreements((prev) => ({ ...prev, isAgreedAgeVerified: !agreements.isAgreedAgeVerified }));
    }

    // '회원탈퇴' 버튼 클릭 시 API 요청 후 프로필 삭제
    const onClickWithdraw = async () => {
        if (!AccessTokenService.hasToken()) {
            return;
        }

        const confirmed = window.confirm(
            '정말 회원탈퇴를 진행하시겠습니까?\n탈퇴 시 계정 정보는 복구할 수 없습니다.'
        );

        if (!confirmed) {
            return; // 취소하면 아무것도 안 함
        }

        const deleteUserRes: DeleteUserRes = await deleteUser("");
        if (deleteUserRes.id > -1) {
            GA4Events.logout();
            trackCustomEvent('withdraw_user', {
                event_category: 'user_management',
            });
            AccessTokenService.clear();
            navigate('/');
            refreshProfile();
        }
    }

    // '회원가입' 또는 '수정완료' 버튼 클릭 시 호출
    const onClickBtnSubmit = () => {
        if (!isValidProfileWithAgreements()) {
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
        const currentProfile: User = await patchUser({
            nickname: newProfile.nickname,
            birthday: newProfile.birthday,
            gender: newProfile.gender,
            imageId: newProfile.imageId,
        });

        if (currentProfile) {
            setCurrentProfile(currentProfile);
            setNewProfile(currentProfile);
            GA4Events.updateProfile();
        }
    };

    // 비회원일 시 회원가입 완료 API 요청 후 프로필 갱신
    const signUp = async () => {

        const request: PostAuthRegisterCompletionReq = {
            registerToken: registerToken,
            nickname: newProfile.nickname,
            birthday: newProfile.birthday,
            gender: newProfile.gender,
            imageId: newProfile.imageId,
            email: email,
        };

        const accessToken: string = await postAuthRegisterCompletion(request);

        if (accessToken) {
            await refreshProfile();
            AccessTokenService.save(accessToken);
            
            // 베타테스터 신청 의도 확인 (localStorage에서)
            if (getBetaTesterIntent()) {
                try {
                    await postBetaTesterBadge();
                    GA4Events.signUp('beta_tester');
                } catch (error) {
                    console.error('베타테스터 신청 실패:', error);
                    GA4Events.exception('beta_tester_apply_failed', '회원가입 후 베타테스터 신청 실패');
                } finally {
                    // 베타테스터 신청 의도 초기화
                    setBetaTesterIntent(false);
                }
            }
            
            setNewProfile({ userId: -1, nickname: "", email: "", birthday: "", gender: Gender.MALE, imageURL: "", imageId: -1, badgeId: 0 });
            navigate(redirectPath);
        }
    }

    //************************************************ VIEW **************************************************//

    return (
        <DefaultLayout background="board">
            <div className={styles.container}>
                <div className={`${isMobile ? styles.profileEditBoxMobile : styles.profileEditBoxWrapper}`}>
                    {/* 이미지 선택 */}
                    <div className={styles.profileImageButton} onClick={onClickBtnProfileImage}>
                        {newProfile.imageURL?.trim() ? (
                            <img className={styles.profileImage} src={newProfile.imageURL} alt="user" />
                        ) : (
                            <div className={styles.defaultProfileImage}>
                                <img src={PersonIcon} alt="기본 프로필" className={styles.personIcon} />
                            </div>
                        )}
                    </div>
                    <p className={`${styles.profileImageTitle} ${newProfile.imageURL?.trim() && newProfile.imageId !== -1 ? styles.profileImageDelete : ""}`}
                        onClick={newProfile.imageURL?.trim() ? onClickBtnDeleteImage : undefined} >
                        {newProfile.imageURL?.trim() && newProfile.imageId !== -1 ? "프로필 사진 삭제" : "프로필 사진 변경 (선택)"}
                    </p>

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
                    <div className={styles.birthdayInputWrapper}>
                        <input
                            className={`${styles.birthdayInput} ${birthdayError ? styles.birthdayInputError : ''}`}
                            type="text"
                            value={birthdayInput}
                            onChange={handleBirthdayChange}
                            placeholder="YYYY-MM-DD (예: 1990-01-01)"
                            maxLength={10}
                        />
                        {birthdayError && (
                            <p className={styles.birthdayErrorMessage}>{birthdayError}</p>
                        )}
                    </div>

                    {/** 서비스 이용동의 - 회원가입 시퀀스에서만 노출 */}
                    {isSignUpPage && (<p className={styles.textLabel}>서비스 이용동의</p>)}
                    {isSignUpPage && (<p className={styles.agreementMessage}>리픽은 관련 법령과 개인정보 처리방침에 따라,{'\n'}서비스 제공 범위를 넘어선 목적으로 개인정보를 사용하지 않습니다.</p>)}
                    {isSignUpPage && (<div className={styles.agreementsWrapper}>
                        {/** 서비스 이용약관 */}
                        <div className={styles.agreementCheckbox}>
                            {agreements.isAgreedTerm ? (
                                <FaCheckSquare className={`${styles.checkboxIcon} ${styles.checked}`} onClick={onClickBoxAgreedTerm} />
                            ) : (
                                <FaRegSquare className={`${styles.checkboxIcon} ${styles.unchecked}`} onClick={onClickBoxAgreedTerm} />
                            )}
                            <span className={styles.checkboxLabel}> [필수] 리픽의 <a href="https://repik-help.notion.site/terms-of-services"
                                className="btn-go-to-docs" target="_blank" rel="noopener noreferrer">
                                <span className={styles.checkboxLabelStrong}> 서비스 이용약관</span>
                            </a>에 동의합니다.</span>
                        </div>
                        {/** 개인정보 취급방침 */}
                        <div className={styles.agreementCheckbox}>
                            {agreements.isAgreedPrivacy ? (
                                <FaCheckSquare className={`${styles.checkboxIcon} ${styles.checked}`} onClick={onClickBoxAgreedPrivacy} />
                            ) : (
                                <FaRegSquare className={`${styles.checkboxIcon} ${styles.unchecked}`} onClick={onClickBoxAgreedPrivacy} />
                            )}
                            <span className={styles.checkboxLabel}> [필수] 리픽의 <a href="https://repik-help.notion.site/privacy-policy"
                                className="btn-go-to-docs" target="_blank" rel="noopener noreferrer">
                                <span className={styles.checkboxLabelStrong}> 개인정보 처리방침</span>
                            </a>에 동의합니다.</span>
                        </div>
                        {/** 14세 이상 이용동의 */}
                        <div className={styles.agreementCheckbox}>
                            {agreements.isAgreedAgeVerified ? (
                                <FaCheckSquare className={`${styles.checkboxIcon} ${styles.checked}`} onClick={onClickBoxAgreedAgeVerified} />
                            ) : (
                                <FaRegSquare className={`${styles.checkboxIcon} ${styles.unchecked}`} onClick={onClickBoxAgreedAgeVerified} />
                            )}
                            <span className={styles.checkboxLabel}><a>[필수] 14세 이상 본인입니다.</a></span>
                        </div>
                    </div>)}

                    {/* 회원가입/프로필수정 버튼 */}
                    <button
                        className={styles.submitButton}
                        onClick={onClickBtnSubmit}
                        disabled={!isValidProfileWithAgreements()}
                    >
                        {isSignUpPage ? '회원가입 완료' : '프로필 수정완료'}
                    </button>

                    {/* 회원탈퇴 버튼 - 회원정보 수정 시퀀스에서만 노출 */}
                    {!isSignUpPage && (
                        <button
                            className={styles.withdrawButton}
                            onClick={onClickWithdraw}
                        >
                            회원탈퇴
                        </button>
                    )}
                </div>
            </div>
        </DefaultLayout>
    );
}

export default ProfileEditPage;