import { HttpMethod } from '@/types/Api';
import { authRequest, publicRequest } from './apiClient';
import { DeleteUserRes, generateDeviceID, GetAuthReq, parseUserAgent, PostAuthRegisterCompletionReq } from '@/types/Auth';

/**
 * 카카오 로그인/회원가입 API
 * 
 * @param request: 유저 사용 환경 정보
 * @returns 리턴 값 없으며 카카오 로그인 성공 시 'login-success'로 라우팅
 */
export const getAuthKakao = async (request: GetAuthReq) => {

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

    // os, browser, version 설정
    console.log(navigator.userAgent);
    const { os, browser, version } = parseUserAgent(navigator.userAgent);
    request.os = request.os ?? os;
    request.browser = request.browser ?? browser;
    request.version = request.version ?? version;
    request.origin = window.location.origin;

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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = await publicRequest<any>(HttpMethod.POST, `/auth/refresh`, { deviceId: deviceId });

    if (result.success) {
        return result.data.accessToken;
    } else {
        throw new Error('Failed to get Auth refresh');
    }
};