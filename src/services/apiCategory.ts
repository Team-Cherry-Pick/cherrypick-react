import apiClient from './apiClient';
import type { Category } from '@/types/Category';

export async function fetchCategories(): Promise<Category[]> {
    const res = await apiClient.get<{ categories: Category[] }>('/v1/category');
    return res.data.categories;
}
