import { Category } from '@/types/Category';
import apiClient from './apiClient';

export async function fetchCategories(): Promise<Category[]> {
    try {
        const res = await apiClient.get('/category');
        console.log(res);
        return res.data.categories;
    } catch (error) {
        console.error('카테고리 조회 실패:', error);
        throw error;
    }
}
