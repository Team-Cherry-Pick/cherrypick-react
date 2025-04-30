/**
 * API 응답 포맷
 * @template T - 서버에서 반환하는 데이터 타입
 */
export interface ResponseData<T> {
    status: number;
    message: string;
    data: T;
}

/**
 * API 호출 중 발생하는 예외 클래스
 */
export class APIException extends Error {
    constructor(public statusCode: number, message?: string) {
        super(message || `API Error: ${statusCode}`);
        this.name = "APIException";
        this.message = message!;
    }
}

/**
 * @enum HTTP Method
 */
export enum HttpMethod {
    POST = "POST",
    GET = "GET",
    UPDATE = "UPDATE",
    DELETE = "DELETE",
    PATCH = "PATCH",
}

/**
 * @enum HTTP Auth Type
 */
export enum HttpAuth {
    USER = "USER",
    NONE = "NONE",
}

/**
 * @enum Token Type
 */
export enum AccessTokenType {
    USER = "USER_ACCESS_TOKEN",
}