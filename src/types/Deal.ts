// 1. 추천용 딜 (GET /api/deal/recommend)
export interface RecommendedDeal {
    dealId: number;
    heat: number;
    imageUrls: DealImage[];
    title: string;
    store: string;
    infoTags: string[];
    price: DealPrice;
    soldout: boolean;
    createdAt: string;
    totalLikes: number;
    totalComments: number;
}

// 2. 상세조회용 딜 (GET /api/deal/{dealId})
export interface DetailedDeal {
    dealId: number;
    heat: number;
    imageUrls: DealImage[];
    user: DealUploadUser;
    store: {
        storeName: string;
        textColor: string;
        backgroundColor: string;
    };
    categorys: string[];
    title: string;
    infoTags: string[];
    shipping: DealShipping;
    price: DealPrice;
    content: string;
    totalViews: number;
    totalLikes: number;
    totalUnLikes: number;
    totalComments: number;
    deepLink: string | null;
    originalUrl: string;
    soldout: boolean;
}

// 3. 전체 조회용 딜 타입 (단일 이미지, 단순 구조)
export interface FetchedDeal {
    dealId: number;
    imageUrl: DealImage;
    heat: number;
    title: string;
    store: string;
    infoTags: string[];
    price: DealPrice;
    createdAt: string;
    totalLikes: number;
    totalComments: number;
    soldout: boolean;
}


export type PriceType = 'KRW' | 'USD' | 'VARIOUS';
export type ShippingType = 'FREE' | 'CONDITIONAL' | 'KRW' | 'USD';

export interface DealImage {
    imageId: number;
    url: string;
    indexes: number; // recommend: indexes, detail: index
}

export interface DealPrice {
    priceType: PriceType;
    regularPrice: number;
    discountedPrice: number;
}

export interface DealShipping {
    shippingType: ShippingType;
    shippingPrice?: number;
    shippingRule: string;
}

export interface DealUploadUser {
    userId: number;
    userName: string;
    userImageUrl: string;
}

export interface DealStore {
    storeName: string;
    textColor: string;
    backgroundColor: string;
}

export interface UploadDeal {
    title: string;
    categoryId?: number;
    imageIds: number[];
    originalUrl: string;
    storeId?: number;
    storeName: string;
    price: DealPrice;
    shipping: DealShipping;
    content: string;
    discountIds: number[];
    discountNames: string[];
    discountDescription: string;
}

export interface UploadDealResponse {
    dealId: number;
    message: string;
}
