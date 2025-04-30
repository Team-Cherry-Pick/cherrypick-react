import apiClientService from "./apiClientService";
import { HttpAuth, HttpMethod } from "@/types/Api";

export const getAuthKakao = async (redirectPath: string) => {
    window.location.href = `${import.meta.env.VITE_API_URL.replace(/\/api$/, '')}/oauth2/authorization/kakao?redirect=${redirectPath}`
}

export const getAuthRefresh = async (): Promise<string | null> => {
    try {
        const response = await apiClientService.request<any>(
            HttpMethod.GET,
            `/auth/refresh`,
            undefined,
            HttpAuth.NONE,
        );

        // accessToken만 꺼내서 반환
        return response?.accessToken ?? null;
    } catch (error) {
        console.error('토큰 갱신 실패:', error);
        return null;
    }
};