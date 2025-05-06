import { AccessTokenType } from "@/types/Api";
import CryptoJS from "crypto-js";

export class AccessTokenService {
  private static readonly SECRET_KEY = import.meta.env.VITE_ENCRYPTION_KEY;

  // 암호화
  private static encryptData(data: string): string {
    return CryptoJS.AES.encrypt(data, this.SECRET_KEY).toString();
  }

  // 복호화
  private static decryptData(encryptedData: string): string | null {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedData, this.SECRET_KEY);
      return bytes.toString(CryptoJS.enc.Utf8);
    } catch (error) {
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
}