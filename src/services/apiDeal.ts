import axios from 'axios';
import type { FetchDealsResponse, UploadDeal, UploadDealResponse } from '@/types/Deal';
import apiClientService from './apiClientService';
import { HttpMethod } from '@/types/Api';

export const fetchDeals = async (page: number): Promise<FetchDealsResponse> => {
    const res = await axios.get(`/deal?page=${page}`);
    return {
        items: res.data.items,
        hasMore: res.data.hasMore,
    };
};

export const uploadDeal = async (deal: UploadDeal): Promise<UploadDealResponse> => {
    try {
        const response = await apiClientService.request<UploadDealResponse>(HttpMethod.POST, '/deal', deal);

        return response;
    } catch (error) {
        console.error('핫딜 업로드 실패:', error);
        throw error;
    }
};
