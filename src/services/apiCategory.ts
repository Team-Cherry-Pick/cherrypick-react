import apiClient from './apiClient';
import type { CategoryTree } from '@/types/Category';

export async function fetchCategories(): Promise<CategoryTree> {
    const res = await apiClient.get<CategoryTree>('/category');
    console.log(res);
    return res.data;
}
