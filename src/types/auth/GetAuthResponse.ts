export class GetAuthResponse {
    userId: number;
    redirectURL: string;
    isNewUser: boolean;
  
    constructor(userId: number, redirectURL: string, isNewUser: boolean) {
      this.userId = userId;
      this.redirectURL = redirectURL;
      this.isNewUser = isNewUser;
    }
  
    static fromJSON(json: any): GetAuthResponse {
      return new GetAuthResponse(
        json.userId,
        json.redirectURL,
        json.isNewUser
      );
    }
  
    toJSON() {
      return {
        userId: this.userId,
        redirectURL: this.redirectURL,
        isNewUser: this.isNewUser
      };
    }
  }
  