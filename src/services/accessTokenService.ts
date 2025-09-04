import CryptoJS from 'crypto-js';

export class AccessTokenService {
    private static readonly SECRET_KEY = import.meta.env.VITE_ENCRYPTION_KEY;
    private static readonly TOKEN_KEY = 'accessToken';

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
        } catch {
            return null;
        }
    }

    // 저장 (암호화)
    static save(token: string) {
        const encrypted = this.encryptData(token);
        localStorage.setItem(this.TOKEN_KEY, encrypted);
    }

    // 가져오기 (복호화)
    static get(): string | null {
        const encrypted = localStorage.getItem(this.TOKEN_KEY);
        if (!encrypted) return null;
        return this.decryptData(encrypted);
    }

    // 삭제
    static clear() {
        localStorage.removeItem(this.TOKEN_KEY);
    }

    // 로그인 여부 확인용 호출 함수
    static hasToken(): boolean {
        const token = this.get();
        return !!token;
    }
}
