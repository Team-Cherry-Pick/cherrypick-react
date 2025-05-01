export class DealImage {
    constructor(
        public imageId: number,
        public url: string,
        public indexes: number
    ) { }

    static fromJSON(json: any): DealImage {
        return new DealImage(json.imageId, json.url, json.indexes);
    }

    toJSON() {
        return {
            imageId: this.imageId,
            url: this.url,
            indexes: this.indexes,
        };
    }
}

export class DealPrice {
    constructor(
        public priceType: string,
        public regularPrice: number,
        public discountedPrice: number
    ) { }

    static fromJSON(json: any): DealPrice {
        return new DealPrice(json.priceType, json.regularPrice, json.discountedPrice);
    }

    toJSON() {
        return {
            priceType: this.priceType,
            regularPrice: this.regularPrice,
            discountedPrice: this.discountedPrice,
        };
    }
}

export class Deal {
    constructor(
        public dealId: number,
        public imageUrl: DealImage,
        public title: string,
        public store: string,
        public infoTags: string[],
        public price: DealPrice,
        public createdAt: string,
        public totalLikes: number,
        public totalComments: number,
        public soldout: boolean
    ) { }

    static fromJSON(json: any): Deal {
        return new Deal(
            json.dealId,
            DealImage.fromJSON(json.imageUrl),
            json.title,
            json.store,
            json.infoTags,
            DealPrice.fromJSON(json.price),
            json.createdAt,
            json.totalLikes,
            json.totalComments,
            json.soldout
        );
    }

    toJSON() {
        return {
            dealId: this.dealId,
            imageUrl: this.imageUrl.toJSON(),
            title: this.title,
            store: this.store,
            infoTags: this.infoTags,
            price: this.price.toJSON(),
            createdAt: this.createdAt,
            totalLikes: this.totalLikes,
            totalComments: this.totalComments,
            soldout: this.soldout,
        };
    }
}