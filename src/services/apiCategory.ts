import { Category } from '@/types/Category';
import { publicRequest } from './apiClient';
import { HttpMethod } from '@/types/Api';

interface fetchCategoriesResponse {
    categories: Category[];
}

export async function fetchCategories(): Promise<Category[]> {
    try {
        const res = await publicRequest<fetchCategoriesResponse>(HttpMethod.GET, '/category');
        return res.categories;
    } catch (error) {
        console.error('카테고리 조회 실패:', error);
        throw error;
    }
}
