import { Deal } from "./Deal";

export class PostSearchDealRes {
  constructor(
    public deals: Deal[],
    public hasNext: boolean
  ) {}

  static fromJSON(json: any): PostSearchDealRes {
    return new PostSearchDealRes(
      (json.deals ?? []).map((d: any) => Deal.fromJSON(d)),
      json.hasNext ?? false
    );
  }

  toJSON() {
    return {
      deals: this.deals.map((d) => d.toJSON()),
      hasNext: this.hasNext,
    };
  }
}