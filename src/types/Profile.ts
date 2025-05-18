export interface Profile {
    nickname: string;
    imageId: number;
    imageUrl: string;
    gender: Gender;
    birthDay: string;
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

export const isValidProfile = (profile: Profile, nicknameEditStatus: NicknameEditStatus) => {
    const { nickname, gender, birthDay } = profile;
    const birthDate = new Date(birthDay);
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
