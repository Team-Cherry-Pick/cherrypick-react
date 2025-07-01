import { Gender } from "./Profile";

export interface GetAuthReq {
    redirect: string;
    deviceId?: string;
    os?: string;
    browser?: string;
    version?: string;
}

export interface PostAuthRegisterCompletionReq {
    registerToken: string;
    nickname: string;
    email: string;
    birthday: string;
    gender: Gender;
    imageId?: number | null;
}

export function generateDeviceID(): string {
    const timePart = Date.now().toString(36);
    const randomPart = Math.random().toString(36).substring(2, 8);
    return (timePart + randomPart).padEnd(16, '0');
}

export function parseUserAgent(ua: string): { os: string; browser: string; version: string } {
    let os = 'Unknown';
    if (/Windows NT/.test(ua)) os = 'Windows';
    else if (/Mac OS X/.test(ua)) os = 'macOS';
    else if (/Android/.test(ua)) os = 'Android';
    else if (/iPhone|iPad/.test(ua)) os = 'iOS';
    else if (/Linux/.test(ua)) os = 'Linux';

    let browser = 'Unknown';
    let version = 'Unknown';

    if (/Chrome\/([\d.]+)/.test(ua)) {
        browser = 'Chrome';
        version = ua.match(/Chrome\/([\d.]+)/)?.[1] || 'Unknown';
    } else if (/Safari\/([\d.]+)/.test(ua) && /Version\/([\d.]+)/.test(ua)) {
        browser = 'Safari';
        version = ua.match(/Version\/([\d.]+)/)?.[1] || 'Unknown';
    } else if (/Firefox\/([\d.]+)/.test(ua)) {
        browser = 'Firefox';
        version = ua.match(/Firefox\/([\d.]+)/)?.[1] || 'Unknown';
    } else if (/Edg\/([\d.]+)/.test(ua)) {
        browser = 'Edge';
        version = ua.match(/Edg\/([\d.]+)/)?.[1] || 'Unknown';
    }

    return { os, browser, version };
}