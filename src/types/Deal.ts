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
    voteType: 'TRUE' | 'FALSE' | 'NONE';
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
    storeId: number;
    categoryId: number;
    categorys: string[];
    discountIds: number[];
    discountName: string;
    title: string;
    infoTags: string[];
    shippingType: ShippingType;
    price: DealPrice;
    content: string;
    totalViews: number;
    totalLikes: number;
    totalUnLikes: number;
    totalComments: number;
    deepLink: string | null;
    originalUrl: string;
    isSoldOut: boolean;
    voteType: 'TRUE' | 'FALSE' | 'NONE';
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
    nickname: string;
    badgeId: number;
    createdAt: string;
    totalLikes: number;
    totalComments: number;
    soldout: boolean;
    voteType: 'TRUE' | 'FALSE' | 'NONE';
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
    discountedPrice: number;
}

export interface DealUploadUser {
    userId: number;
    userName: string;
    userImageUrl: string;
    badgeId?: number;
}

export interface FetchDealsResponse {
    deals: FetchedDeal[];
    hasNext: boolean;
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
    shippingType: ShippingType;
    content: string;
    discountIds: number[];
    discountNames: string[];
}

export interface UpdateDeal extends UploadDeal {
    dealId: number;
}

export interface UploadDealResponse {
    dealId: number;
    message: string;
}

export interface Store {
    storeId: number;
    name: string;
    isAffiliate: boolean;
    backgroundColor: string;
    textColor: string;
    storeRank: number;
}

// Toolbox Product Info API 응답 타입
export interface ProductInfo {
    title: string;
    imageUrls: DealImage[];
    store: {
        storeName: string;
        textColor: string;
        backgroundColor: string;
    };
    shippingType: ShippingType;
    price: DealPrice;
    deeplink?: string;
    originalUrl: string;
}

export interface CategorySuggestion {
    categoryId: number;
    categorys: string[];
}