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

export interface DealPrice {
    priceType: 'KRW' | 'USD'; // 혹시 나중에 글로벌 대응한다면 추가
    regularPrice: number;
    discountedPrice: number;
}

export interface DealShipping {
    shippingType: 'FREE' | 'PAID';
    shippingPrice: number;
    shippingRule: string;
}

