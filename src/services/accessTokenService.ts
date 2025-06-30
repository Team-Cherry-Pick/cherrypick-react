import { AccessTokenType } from '@/types/Api';
import CryptoJS from 'crypto-js';

export class AccessTokenService {
    private static readonly SECRET_KEY = import.meta.env.VITE_ENCRYPTION_KEY;

    // 환경 변수 검증
    private static checkSecretKey() {
        if (!this.SECRET_KEY) {
            alert('서비스 환경이 올바르게 설정되지 않았습니다. 잠시 후 다시 시도해주세요.');
            throw new Error('환경변수(ENCRYPTION_KEY)가 설정되지 않았습니다.');
        }
    }

    // 암호화
    private static encryptData(data: string): string {
        this.checkSecretKey();
        return CryptoJS.AES.encrypt(data, this.SECRET_KEY).toString();
    }

    // 복호화
    private static decryptData(encryptedData: string): string | null {
        this.checkSecretKey();
        try {
            const bytes = CryptoJS.AES.decrypt(encryptedData, this.SECRET_KEY);
            return bytes.toString(CryptoJS.enc.Utf8);
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    // 저장 (암호화)
    static save(type: AccessTokenType, token: string) {
        const encrypted = this.encryptData(token);
        localStorage.setItem(type, encrypted);
    }

    // 가져오기 (복호화)
    static get(type: AccessTokenType): string | null {
        const encrypted = localStorage.getItem(type);
        if (!encrypted) return null;
        return this.decryptData(encrypted);
    }

    // 삭제
    static clear(type: AccessTokenType) {
        localStorage.removeItem(type);
    }

    // 로그인 여부 확인용 호출 함수
    static hasToken(type: AccessTokenType): boolean {
        const token = this.get(type);
        return !!token;
    }
}
