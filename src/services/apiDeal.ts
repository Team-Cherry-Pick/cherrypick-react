import axios from 'axios';
import type { FetchDealsResponse, UploadDeal, UploadDealResponse } from '@/types/Deal';
import apiClientService from './apiClientService';
import { HttpMethod } from '@/types/Api';

const API = import.meta.env.VITE_API_URL;

export const fetchDeals = async (page: number): Promise<FetchDealsResponse> => {
    const res = await axios.post(`${API}/search/deal`, {
        page,
        size: 20,
        sortType: 'LATEST', // 필터 없이 전체 조회
    });

    return {
        deals: res.data.deals,
        hasNext: res.data.hasNext,
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
