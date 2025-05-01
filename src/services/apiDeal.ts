import axios from "axios";
import type { FetchDealsResponse } from '@/types/Deal';
import { HttpMethod } from "@/types/Api";
import apiClientService from "./apiClientService";
import { PostSearchDealRes } from "@/types/deal/PostSearchDealRes";
import { PostSearchDealReq } from "@/types/deal/PostSearchDealReq";

export const fetchDeals = async (page: number): Promise<FetchDealsResponse> => {
    const res = await axios.get(`/deal?page=${page}`);
    return {
        items: res.data.items,
        hasMore: res.data.hasMore,
    };
};

export const postSearchDeal = async (req: PostSearchDealReq): Promise<PostSearchDealRes> => {
    try {
        const response = await apiClientService.request<PostSearchDealRes>(
            HttpMethod.POST,
            `/search/deal`,
            req,
        );
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
};