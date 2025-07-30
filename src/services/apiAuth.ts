import { HttpMethod } from '@/types/Api';
import { authRequest, publicRequest } from './apiClient';
import { DeleteUserRes, generateDeviceID, GetAuthReq, getDeviceInfo, PostAuthRegisterCompletionReq } from '@/types/Auth';
import axios from 'axios';
import { ENV } from '@/utils/environment';

/**
 * 카카오 로그인/회원가입 API
 * 
 * @param redirectPath: 로그인 후 이동할 라우터 패스
 * @returns 리턴 값 없으며 카카오 로그인 성공 시 'login-success'로 라우팅
 */
export const getAuthKakao = async (redirectPath: string) => {

    const request: GetAuthReq = {redirect: redirectPath, origin: window.location.origin};
    const apiUrl = import.meta.env.VITE_API_URL || null;

    if (!apiUrl) {
        alert('서비스 환경이 올바르게 설정되지 않았습니다. 잠시 후 다시 시도해주세요.');
        return;
    }

    // deviceID(UUID) 설정
    const savedDeviceID: string | null = localStorage.getItem('deviceID');
    if (!savedDeviceID) {
        const newDeviceID = generateDeviceID();
        localStorage.setItem('deviceID', newDeviceID);
    }
    request.deviceId = savedDeviceID!;

    // os, browser, version 등 기기 정보 설정
    const { os, browser, version } = getDeviceInfo();
    request.os = request.os ?? os;
    request.browser = request.browser ?? browser;
    request.version = request.version ?? version;

    // query 파라미터 설정
    const query = new URLSearchParams();
    for (const [key, value] of Object.entries(request)) {
        if (value !== null && value !== undefined) {
            query.append(key, value);
        }
    }

    // 카카오 로그인으로 이동
    const url = `${apiUrl.replace(/\/api$/, '')}/oauth2/authorization/kakao?${query.toString()}`;
    window.location.href = url;
};

/**
 * 리픽 회원가입 API
 * 
 * @param request: 회원가입에 필요한 유저 정보
 * @returns 액세스 토큰
 */
export async function postAuthRegisterCompletion(request: PostAuthRegisterCompletionReq): Promise<string> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = await publicRequest<any>(HttpMethod.POST, `/auth/register-completion`, request);

    if (result.success) {
        return result.data.accessToken;
    } else {
        throw result.error;
    }
};

/**
 * 리픽 회원탈퇴 API
 * 
 * @param reason: 회원탈퇴 사유 (현재는 빈 스트링 전달)
 * @returns DeleteUserRes: 삭제된 유저 번호 및 삭제 메세지
 */
export async function deleteUser(reason: string): Promise<DeleteUserRes> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = await authRequest<any>(HttpMethod.DELETE, `/user`, { reason: reason });

    if (result.success) {
        return result.data;
    } else {
        throw result.error;
    }
};

/**
 * 리픽 토큰 재발급 API
 * 
 * @param deviceId: 기기 UUID
 * @returns 액세스 토큰
 */
export const getAuthRefresh = async (deviceId: string): Promise<string> => {
    try {
        const response = await axios.post(
            `${ENV.API_URL}/auth/refresh`,
            { deviceId },
            {
                withCredentials: true, // 쿠키 필요 시
                headers: { 'Content-Type': 'application/json' },
                timeout: 5000,
            }
        );

        return response.data.accessToken;
    } catch (error) {
        throw new Error(`Failed to get Auth refresh: ${(error as Error).message}`);
    }
};