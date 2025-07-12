import { Gender } from "./Profile";
import { isAndroid, isIOS, isWindows, isMacOs } from 'react-device-detect';

export interface GetAuthReq {
    redirect: string;
    origin: string;
    deviceId?: string;
    os?: string;
    browser?: string;
    version?: string;
}

export interface PostAuthRegisterCompletionReq {
    registerToken: string;
    updateDTO: UpdateDTO;
}

export interface UpdateDTO {
    nickname: string;
    email: string;
    birthday: string;
    gender: Gender;
    imageId?: number | null;
}

export interface DeleteUserRes {
    id: number;
    message: string;
}

export function generateDeviceID(): string {
    const timePart = Date.now().toString(36);
    const randomPart = Math.random().toString(36).substring(2, 8);
    return (timePart + randomPart).padEnd(16, '0');
}

export function getDeviceInfo(): { os: string; browser: string; version: string } {

    const userAgent = navigator.userAgent;

    let browser = 'Unknown';
    let version = 'Unknown';
    let os = 'Unknown';

    if (isAndroid) os = 'android';
    else if (isIOS) os = 'ios';
    else if (isWindows) os = 'windows';
    else if (isMacOs) os = 'macos';

    if (/Chrome\/([\d.]+)/.test(userAgent)) {
        browser = 'Chrome';
        version = userAgent.match(/Chrome\/([\d.]+)/)?.[1] || 'Unknown';
    } else if (/Safari\/([\d.]+)/.test(userAgent) && /Version\/([\d.]+)/.test(userAgent)) {
        browser = 'Safari';
        version = userAgent.match(/Version\/([\d.]+)/)?.[1] || 'Unknown';
    } else if (/Firefox\/([\d.]+)/.test(userAgent)) {
        browser = 'Firefox';
        version = userAgent.match(/Firefox\/([\d.]+)/)?.[1] || 'Unknown';
    } else if (/Edg\/([\d.]+)/.test(userAgent)) {
        browser = 'Edge';
        version = userAgent.match(/Edg\/([\d.]+)/)?.[1] || 'Unknown';
    }

    return { os, browser, version };
}