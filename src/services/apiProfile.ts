import { HttpMethod } from "@/types/Api";
import { GetNicknameValidationRes, GetUserRes, PatchUserReq, PatchUserRes, PostBetaTesterBadgeRes } from "@/types/Profile";
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
 * @returns PatchUserRes: 새롭게 변경된 프로필
 */
export async function patchUser(request: PatchUserReq): Promise<PatchUserRes> {
    const result = await authRequest<PatchUserRes>(HttpMethod.PATCH, `/user`, request);
    if (result.success) {
        return result.data;
    } else {
        throw result.error;
    }
}

/**
 * 베타테스터 배지 요청 API
 * 
 * @returns PostBetaTesterBadgeRes: 처리 결과 메시지
 */
export async function postBetaTesterBadge(): Promise<PostBetaTesterBadgeRes> {
    const result = await authRequest<PostBetaTesterBadgeRes>(HttpMethod.POST, `/user/badge/beta-tester`);
    if (result.success) {
        return result.data;
    } else {
        throw result.error;
    }
}