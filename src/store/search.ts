import { atom } from 'jotai';

// 타입
export type TimeRange = 'LAST3HOURS' | 'LAST6HOURS' | 'LAST12HOURS' | 'LAST24HOURS' | 'LAST3DAYS' | 'LAST7DAYS';

export type SortType = 'POPULARITY' | 'VIEWS' | 'LATEST' | 'PRICE_HIGH' | 'PRICE_LOW' | 'DISCOUNT_RATE';

export type PriceType = 'KRW' | 'USD';

export interface BasicFilters {
    viewSoldOut: boolean;
    freeShipping: boolean;
    globalShipping: boolean;
}

export interface PriceFilter {
    priceType?: PriceType;
    minPrice?: number;
    maxPrice?: number;
}

export interface SearchRequest {
    categoryId?: number;
    keyword?: string;
    filters: BasicFilters;
    timeRange?: TimeRange;
    sortType: SortType;
    priceFilter: PriceFilter;
    variousPrice: boolean;
    discountIds: number[];
    storeIds: number[];
}

// Atoms
export const basicFiltersAtom = atom<BasicFilters>({
    viewSoldOut: false,
    freeShipping: true,
    globalShipping: false,
});

export const timeRangeAtom = atom<TimeRange | undefined>('LAST24HOURS');

export const sortTypeAtom = atom<SortType>('LATEST');

export const categoryIdAtom = atom<number | undefined>(undefined);

export const keywordAtom = atom<string>('');

export const priceFilterAtom = atom<PriceFilter>({
    priceType: 'KRW',
    minPrice: undefined,
    maxPrice: undefined,
});

export const variousPriceAtom = atom<boolean>(true);

export const selectedStoresAtom = atom<{ name: string; storeId: number }[]>([]);

export const selectedDiscountAtom = atom<{ name: string; discountId: number }[]>([]);

// 필터 조작을 위한 유틸 Atoms
export const toggleBasicFilterAtom = atom(null, (get, set, filterKey: keyof BasicFilters) => {
    const current = get(basicFiltersAtom);
    set(basicFiltersAtom, {
        ...current,
        [filterKey]: !current[filterKey],
    });
});

export const setTimeRangeAtom = atom(null, (_, set, timeRange: TimeRange | undefined) => {
    set(timeRangeAtom, timeRange);
});

export const setSortTypeAtom = atom(null, (_, set, sortType: SortType) => {
    set(sortTypeAtom, sortType);
});

export const updatePriceFilterAtom = atom(null, (get, set, updates: Partial<PriceFilter>) => {
    const current = get(priceFilterAtom);
    set(priceFilterAtom, {
        ...current,
        ...updates,
    });
});

export const searchRequestAtom = atom<SearchRequest>(get => {
    const basicFilters = get(basicFiltersAtom);
    const timeRange = get(timeRangeAtom);
    const sortType = get(sortTypeAtom);
    const categoryId = get(categoryIdAtom);
    const keyword = get(keywordAtom);
    const priceFilter = get(priceFilterAtom);
    const variousPrice = get(variousPriceAtom);
    const stores = get(selectedStoresAtom);
    const discounts = get(selectedDiscountAtom);

    const request: SearchRequest = {
        filters: basicFilters,
        sortType,
        priceFilter,
        variousPrice,
        discountIds: discounts.map(discount => discount.discountId),
        storeIds: stores.map(store => store.storeId),
    };

    // 선택적 필드 추가
    if (categoryId !== undefined) {
        request.categoryId = categoryId;
    }

    if (keyword.trim()) {
        request.keyword = keyword.trim();
    }

    if (timeRange) {
        request.timeRange = timeRange;
    }

    return request;
});

// 필터 초기화
export const resetFiltersAtom = atom(null, (_, set) => {
    set(basicFiltersAtom, {
        viewSoldOut: false,
        freeShipping: true,
        globalShipping: false,
    });
    set(timeRangeAtom, 'LAST24HOURS');
    set(sortTypeAtom, 'LATEST');
    set(categoryIdAtom, undefined);
    set(keywordAtom, '');
    set(priceFilterAtom, {
        priceType: undefined,
        minPrice: undefined,
        maxPrice: undefined,
    });
    set(variousPriceAtom, true);
    set(selectedStoresAtom, []);
    set(selectedDiscountAtom, []);
});

// 트리거
export const fetchTriggerAtom = atom(0);

export const triggerFetchAtom = atom(null, (get, set) => {
    set(fetchTriggerAtom, get(fetchTriggerAtom) + 1);
});
