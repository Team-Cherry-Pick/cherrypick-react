import { Category } from '@/types/Category';
import { publicRequest } from './apiClient';
import { HttpMethod } from '@/types/Api';

interface fetchCategoriesResponse {
    categories: Category[];
}

export async function fetchCategories(): Promise<Category[]> {
    const result = await publicRequest<fetchCategoriesResponse>(HttpMethod.GET, '/category');
    if (result.success) {
        return result.data.categories;
    } else {
        return [];
    }
}
