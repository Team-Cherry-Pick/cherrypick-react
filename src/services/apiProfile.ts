import { HttpMethod } from "@/types/Api";
import apiClientService from "./apiClientService";
import { GetNicknameValidationRes, PutUserReq, PutUserRes } from "@/types/Profile";

/**
 * 유저 닉네임 유효성 검사 API
 * 
 * @param request: 변경하고 싶은 닉네임
 * @returns GetNicknameValidationRes: 검증여부
 */
export const getNicknameValidation = async (request: string): Promise<GetNicknameValidationRes> => {
    try {
        const response: GetNicknameValidationRes = await apiClientService.request<GetNicknameValidationRes>(
            HttpMethod.GET,
            `/user/nickname-validation?nickname=${request}`,
            undefined,
        );

        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

/**
 * 유저 정보 수정 API
 * 
 * @param request: 변경하고 싶은 프로필
 * @returns PutUserRes: 새롭게 변경된 프로필
 */
export const putUser = async (request: PutUserReq): Promise<PutUserRes> => {
    try {
        const response: PutUserRes = await apiClientService.request<PutUserRes>(
            HttpMethod.PUT,
            `/user`,
            request,
        );

        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
};