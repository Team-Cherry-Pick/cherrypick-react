import { useEffect } from 'react';
import { useSetAtom } from 'jotai';
import { fetchCategories } from '@/services/apiCategory';
import { categoryTreeAtom } from '@/store/category';

export function useCategories() {
    const setCategoryTree = useSetAtom(categoryTreeAtom);

    useEffect(() => {
        console.log('[카테고리 API 호출] GET', '/v1/category');

        fetchCategories().then(setCategoryTree).catch(console.error);
    }, [setCategoryTree]);
}
