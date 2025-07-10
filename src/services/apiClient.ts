import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { AccessTokenType, APIException, HttpMethod, ResponseData } from '@/types/Api';
import { AccessTokenService } from './accessTokenService';
import { getAuthRefresh } from './apiAuth';

const apiUrl = import.meta.env.VITE_API_URL || null;

if (!apiUrl) {
    alert('서비스 환경이 올바르게 설정되지 않았습니다. 잠시 후 다시 시도해주세요.');
    throw new Error('환경변수(API URL)가 설정되지 않았습니다.');
}

interface ErrorHandlingOptions {
    silent?: boolean;
    customMessage?: string;
}

interface InternalAxiosRequestConfigWithRetry extends InternalAxiosRequestConfig {
    _retry?: boolean;
}

type Result<T, E = APIException> = { success: true; data: T } | { success: false; error: E };

class GlobalErrorHandler {
    private static instance: GlobalErrorHandler;

    static getInstance() {
        if (!GlobalErrorHandler.instance) {
            GlobalErrorHandler.instance = new GlobalErrorHandler();
        }
        return GlobalErrorHandler.instance;
    }

    handleError(error: APIException, options: ErrorHandlingOptions = {}) {
        // 사일런트 모드가 아니면 알림 표시
        if (!options.silent) {
            let message = options.customMessage || error.message || 'API 오류가 발생했습니다.';

            if (error.statusCode === 500) {
                if (process.env.NODE_ENV === 'development') {
                    alert(`[500 Error] ${error.message}`);
                } else {
                    message = '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
                    alert(message);
                    return;
                }
            } else {
                alert(message);
            }
        }
    }
}

// 인증이 필요 없는 공개 API용 axios 인스턴스
const publicApiClient = axios.create({
    baseURL: apiUrl,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// 인증이 필요한 API용 axios 인스턴스
const authApiClient = axios.create({
    baseURL: apiUrl,
    timeout: 5000,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

/**
 * 인증이 필요한 요청에 대한 인터셉터 설정
 * - 요청 시 Authorization 헤더 자동 추가
 */
authApiClient.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {

        // 기기 UUID 및 토큰 없을 시, API 호출 중단 및 즉시 로그인 페이지 이동
        const deviceID: string | null = localStorage.getItem('deviceID');
        const accessToken: string | null = AccessTokenService.get(AccessTokenType.USER);
        if (!deviceID || !accessToken) {
            localStorage.removeItem("deviceID");
            AccessTokenService.clear(AccessTokenType.USER);
            window.location.href = '/login';
            alert('로그인이 만료되었습니다. 다시 로그인해주세요.');
            return new Promise(() => { });
        }

        // 비정상 상황 없을 경우 API 호출 시퀀스 유지
        config.headers.Authorization = `Bearer ${accessToken}`;
        return config;
    },
    error => {
        return Promise.reject(error);
    },
);

/**
 * 인증이 필요한 요청에 대한 응답 인터셉터 설정
 * - 토큰 만료 시 리프레쉬 토큰 발급하여 API 요청 재개
 */
authApiClient.interceptors.response.use(
    response => response,
    async (error: AxiosError) => {

        // 현재 요청의 config에 재시도 여부 플래그를 반영하기 위해 캐스팅
        const originalRequest = error.config as InternalAxiosRequestConfigWithRetry;

        // 토큰 만료로 API 서버가 401을 반환한 경우
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // 기기 UUID 없을 시, API 호출 중단 및 즉시 로그인 페이지 이동
                const deviceID: string | null = localStorage.getItem('deviceID');
                if (!deviceID) {
                    throw new Error('Failed to load DeviceID');
                }

                // 정상적으로 토큰이 갱신된 경우 헤더 설정하여 API 호출 시퀀스 재개
                const newAccessToken = await getAuthRefresh(deviceID);
                if (newAccessToken && originalRequest.headers) {
                    AccessTokenService.save(AccessTokenType.USER, newAccessToken);
                    originalRequest.headers.set('Authorization', `Bearer ${newAccessToken}`);
                }

                return authApiClient(originalRequest);
            } catch (refreshError) {
                console.error('Fail to refresh token', refreshError);
                localStorage.removeItem("deviceID");
                AccessTokenService.clear(AccessTokenType.USER);
                window.location.href = '/login';
                alert('로그인이 만료되었습니다. 다시 로그인해주세요.');
                return Promise.reject(refreshError);
            }
        }

        // 그 외 에러는 그대로
        return Promise.reject(error);
    }
);

/**
 * 공통 에러 핸들러 - 개발 모드에서만 로깅
 * @param {AxiosError} error - Axios 오류 객체
 * @returns {APIException} - 처리된 오류 객체
 */
function handleError(error: AxiosError): APIException {
    if (error.response) {
        const responseData = error.response.data as ResponseData<null>;

        // 개발 모드에서만 콘솔 로깅
        if (process.env.NODE_ENV === 'development') {
            console.error('[API Error]', error.response.status, responseData?.message);
        }

        return new APIException(error.response.status, responseData?.message || 'API Error');
    } else if (error.request) {
        if (process.env.NODE_ENV === 'development') {
            console.error('[Network Error]', error.message);
        }
        return new APIException(0, 'Network error');
    } else {
        if (process.env.NODE_ENV === 'development') {
            console.error('[Unknown Error]', error.message);
        }
        return new APIException(-1, 'Unknown error');
    }
}

/**
 * 인증이 필요한 API 요청 함수 - Result 패턴 적용
 * @template T - 반환할 데이터 타입
 * @param {HttpMethod} method - HTTP 메서드
 * @param {string} url - 요청할 엔드포인트 URL
 * @param {unknown} [data] - 요청 바디 데이터 (선택적)
 * @param {Record<string, unknown>} [config] - axios 설정 (선택적)
 * @param {ErrorHandlingOptions} [errorOptions] - 에러 처리 옵션 (선택적)
 * @returns {Promise<Result<T>>} - 성공/실패 정보를 포함한 결과
 */
export async function authRequest<T>(
    method: HttpMethod,
    url: string,
    data?: unknown,
    config?: Record<string, unknown>,
    errorOptions?: ErrorHandlingOptions,
): Promise<Result<T>> {
    try {
        const response = await authApiClient.request<T>({
            method,
            url,
            data,
            ...config,
        });

        return { success: true, data: response.data };
    } catch (error) {
        const apiError = handleError(error as AxiosError);

        GlobalErrorHandler.getInstance().handleError(apiError, errorOptions);

        return { success: false, error: apiError };
    }
}

/**
 * 인증이 필요 없는 API 요청 함수 - Result 패턴 적용
 * @template T - 반환할 데이터 타입
 * @param {HttpMethod} method - HTTP 메서드
 * @param {string} url - 요청할 엔드포인트 URL
 * @param {unknown} [data] - 요청 바디 데이터 (선택적)
 * @param {Record<string, unknown>} [config] - axios 설정 (선택적)
 * @param {ErrorHandlingOptions} [errorOptions] - 에러 처리 옵션 (선택적)
 * @returns {Promise<Result<T>>} - 성공/실패 정보를 포함한 결과
 */
export async function publicRequest<T>(
    method: HttpMethod,
    url: string,
    data?: unknown,
    config?: Record<string, unknown>,
    errorOptions?: ErrorHandlingOptions,
): Promise<Result<T>> {
    try {
        const response = await publicApiClient.request<T>({
            method,
            url,
            data,
            ...config,
        });

        return { success: true, data: response.data };
    } catch (error) {
        const apiError = handleError(error as AxiosError);

        GlobalErrorHandler.getInstance().handleError(apiError, errorOptions);

        return { success: false, error: apiError };
    }
}
