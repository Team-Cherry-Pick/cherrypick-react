export interface Deal {
    dealId: number;
    imageUrls: DealImage[];
    title: string;
    categoryId: number;
    originalUrl: string;
    storeId: number;
    storeName: string;
    price: DealPrice;
    shipping: DealShipping;
    content: string;
    discountIds: number[];
    discountNames: string[];
    isSoldOut: boolean;

    viewCount: number;
    likeCount: number;
    commentCount: number;
}

export interface FetchDealsResponse {
    items: Deal[];
    hasMore: boolean;
}

export interface DealImage {
    imageId: number;
    url: string;
    index: number;
}

export interface DealPrice { // 한국, 달러
    priceType: 'KRW' | 'USD' | null;
    regularPrice: number;
    discountedPrice: number;
}

export interface DealShipping { // 무료배송 여부
    shippingType: 'FREE' | 'PAID' | 'CONDITIONAL' | null;
    shippingPrice: number;
    shippingRule: string;
}

