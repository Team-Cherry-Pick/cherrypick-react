// src/hooks/useCategories.ts
import { useEffect } from 'react';
import { useSetAtom } from 'jotai';
import { fetchCategories } from '@/services/apiCategory';
import { categoryTreeAtom } from '@/store/category';

export function useCategories() {
    const setCategoryTree = useSetAtom(categoryTreeAtom);

    useEffect(() => {
        fetchCategories()
            .then(setCategoryTree)
            .catch((error) => {
                console.error('[카테고리 API 에러]', error);
            });
    }, [setCategoryTree]);
}
