export interface Profile {
    nickname: string;
    imageId?: number | null;
    imageUrl?: string | null;
    gender?: Gender | null;
    birthDay?: string | null;
}

export enum NicknameEditStatus {
    NONE = "NONE",
    EDITING = "EDITING",
    VALID = "VALID",
    INVALID = "INVALID",
}

export enum Gender {
    MALE = "MALE",
    FEMALE = "FEMALE"
}

/**
 * @todo: 얘들 다 nullable한지 결정합시다
 */
export const isValidProfile = (profile: Profile, nicknameEditStatus: NicknameEditStatus) => {
    const { nickname, gender, birthDay } = profile;
    const birthDate = new Date(birthDay ?? "");
    const now = new Date();

    return (
        nickname &&
        nicknameEditStatus === NicknameEditStatus.VALID &&
        gender &&
        birthDay &&
        !isNaN(birthDate.getTime()) &&
        birthDate.getFullYear() >= 1900 &&
        birthDate <= now
    );
};

export interface GetNicknameValidationRes {
    nickname: string;
    isValid: boolean;
    details: string;
}

export interface PutUserReq {
  nickname: string;
  birthday?: string | null;
  gender?: Gender | null;
  imageId?: number | null;
}

export interface PutUserRes {
  userId: number;
  nickname: string;
  email: string;
  birthday?: string | null;
  gender?: Gender | null;
  imageURL?: string | null;
  imageId?: number | null;
}