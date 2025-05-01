export class PostSearchDealReq {
    constructor(
      public page: number,
      public size: number
    ) {}
  
    static fromJSON(json: any): PostSearchDealReq {
      return new PostSearchDealReq(json.page, json.size);
    }
  
    toJSON() {
      return {
        page: this.page,
        size: this.size,
      };
    }
  }
  
  