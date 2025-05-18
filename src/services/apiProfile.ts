import { HttpMethod } from "@/types/Api";
import apiClientService from "./apiClientService";
import { GetNicknameValidationRes } from "@/types/Profile";

/**
 * 유저 닉네임 유효성 검사 API
 * 
 * @param newNickname: 변경하고 싶은 닉네임
 * @returns GetNicknameValidationRes: 검증여부
 */
export const getNicknameValidation = async (newNickname: string): Promise<GetNicknameValidationRes> => {
    try {
        const response: GetNicknameValidationRes = await apiClientService.request<GetNicknameValidationRes>(
            HttpMethod.GET,
            `/user/nickname-validation?nickname=${newNickname}`,
            undefined,
        );

        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
};