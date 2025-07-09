import { AccessTokenService } from "@/services/accessTokenService";
import { AccessTokenType } from "./Api";

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

export const isValidProfile = (newUser: User, currentUser: User, nicknameEditStatus: NicknameEditStatus) => {
    const isNotChangedProfile = JSON.stringify(newUser) === JSON.stringify(currentUser);
    if(AccessTokenService.hasToken(AccessTokenType.USER) && isNotChangedProfile) {
        return false;
    }

    const { nickname, gender, birthday, email } = newUser;
    const birthDate = new Date(birthday ?? "");
    const now = new Date();

    return (
        nickname &&
        nicknameEditStatus === NicknameEditStatus.VALID &&
        gender &&
        birthday &&
        email &&
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
    birthday: string;
    gender: Gender;
    imageId?: number | null;
}

export interface User {
    userId: number;
    nickname: string;
    email: string;
    birthday: string;
    gender: Gender;
    imageURL?: string | null;
    imageId?: number | null;
}

export type GetUserRes = User;
export type PutUserRes = User;