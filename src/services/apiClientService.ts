import { AccessTokenType, APIException, HttpMethod, ResponseData } from "@/types/Api";
import { AccessTokenService } from "./accessTokenService";
import axios, { AxiosError, InternalAxiosRequestConfig, AxiosResponse } from "axios";

/**
 * API 요청 및 응답을 관리하는 클래스
 */
class ApiClientService {

    // Axios 인스턴스 생성
    private instance = axios.create({
        baseURL: import.meta.env.VITE_API_URL,
        timeout: 5000,
        withCredentials: true,
        headers: {
            "Content-Type": "application/json",
        },
    });

    constructor() {
        // 요청 인터셉터 설정
        this.instance.interceptors.request.use(
            (config: InternalAxiosRequestConfig) =>
                this.handleRequest(config) as InternalAxiosRequestConfig,
            (error) => Promise.reject(this.handleError(error))
        );

        // 응답 인터셉터 설정
        this.instance.interceptors.response.use(
            (response) => this.handleResponse(response),
            (error) => Promise.reject(this.handleError(error))
        );
    }

    /**
     * HTTP 요청을 처리하는 인터셉터
     * @param {InternalAxiosRequestConfig} config - 요청 설정 객체
     * @returns {InternalAxiosRequestConfig} - 수정된 요청 설정
     */
    private handleRequest(config: InternalAxiosRequestConfig) {
        const token = localStorage.getItem("token"); // 로컬 스토리지에서 토큰 가져오기
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // Authorization 헤더 추가
        }

        console.log("[Request]", config.method?.toUpperCase(), config.url, config);
        return config;
    }

    /**
     * HTTP 응답을 처리하는 인터셉터
     * @template T - 응답 데이터 타입
     * @param {AxiosResponse<APIResponse<T>>} response - 서버 응답 객체
     * @returns {T} - 서버에서 반환한 실제 데이터
     */
    private handleResponse<T>(response: AxiosResponse<T>): T {
        console.log("[Response]", response.status, response.data);
        return response.data;
    }

    /**
     * HTTP 요청 중 발생한 오류를 처리하는 메서드
     * @param {AxiosError} error - Axios 오류 객체
     * @returns {APIException} - 처리된 오류 객체
     */
    private handleError(error: AxiosError) {
        // 서버에서 오류 응답을 반환한 경우
        if (error.response) {
            const responseData = error.response.data as ResponseData<null>;
            console.error("[API Error]", error.response.status, responseData.message);
            return new APIException(error.response.status, responseData.message);
        }
        // 요청을 보냈지만 응답이 없는 경우 (네트워크 문제)
        else if (error.request) {
            console.error("[Network Error]", error.message);
            return new APIException(0, "Network error");
        }
        // 요청을 보내기 전에 오류 발생
        else {
            console.error("[Unknown Error]", error.message);
            return new APIException(-1, "Unknown error");
        }
    }

    /**
     * API 요청을 보내는 메서드
     * @template T - 반환할 데이터 타입
     * @param {"GET" | "POST"} method - HTTP 메서드
     * @param {string} url - 요청할 엔드포인트 URL
     * @param {unknown} [data] - 요청 바디 데이터 (선택적)
     * @returns {Promise<T>} - API 응답 데이터
     */
    async request<T>(method: HttpMethod, url: string, data?: unknown): Promise<T> {
        try {
            const headers: Record<string, string> = {};
            const userToken = AccessTokenService.get(AccessTokenType.USER);
            if (userToken) headers.Authorization = `Bearer ${userToken}`;
            const response = await this.instance.request<T>({ method, url, data });
            return response as T;
        } catch (error) {
            return Promise.reject(this.handleError(error as AxiosError));
        }
    }
}

export default new ApiClientService();