import { HttpMethod } from "@/types/Api";
import { GetNicknameValidationRes, GetUserRes, PutUserReq, PutUserRes } from "@/types/Profile";
import { authRequest, publicRequest } from "./apiClient";

/**
 * 유저 닉네임 유효성 검사 API
 * 
 * @param request: 변경하고 싶은 닉네임
 * @returns GetNicknameValidationRes: 검증여부
 */
export async function getNicknameValidation(request: string): Promise<GetNicknameValidationRes> {
    const result = await publicRequest<GetNicknameValidationRes>(HttpMethod.GET, `/user/nickname-validation?nickname=${request}`);
    if (result.success) {
        return result.data;
    } else {
        throw result.error;
    }
}

/**
 * 유저 정보 수정 API
 * 
 * @param request: 변경하고 싶은 프로필
 * @returns GutUserRes: 현재 프로필
 */
export async function getUser(): Promise<GetUserRes> {
    const result = await authRequest<GetUserRes>(HttpMethod.GET, `/user`);
    if (result.success) {
        return result.data;
    } else {
        throw result.error;
    }
}

/**
 * 유저 정보 수정 API
 * 
 * @param request: 변경하고 싶은 프로필
 * @returns PutUserRes: 새롭게 변경된 프로필
 */
export async function putUser(request: PutUserReq): Promise<PutUserRes> {
    const result = await authRequest<PutUserRes>(HttpMethod.PUT, `/user`, request);
    if (result.success) {
        return result.data;
    } else {
        throw result.error;
    }
}