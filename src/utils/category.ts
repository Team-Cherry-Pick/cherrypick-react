// utils/category.ts
import { Category } from '@/types/Category';

// 1단계, 2단계 등 원하는 depth만큼 flat하게 추출
export function flattenCategoriesByDepth(
    categories: Category[],
    depth = 1
): Category[] {
    if (depth <= 1) return categories;

    const result: Category[] = [];
    for (const category of categories) {
        if (depth === 2) {
            result.push(...category.subCategories);
        } else {
            result.push(...flattenCategoriesByDepth(category.subCategories, depth - 1));
        }
    }

    return result;
}

// 특정 ID를 가진 카테고리의 경로를 추출
export function findCategoryPathById(
    categories: Category[],
    targetId: number
): string[] {
    const path: string[] = [];

    function dfs(nodes: Category[], currentPath: string[]): boolean {
        for (const node of nodes) {
            const nextPath = [...currentPath, node.name];
            if (node.id === targetId) {
                path.push(...nextPath);
                return true;
            }
            if (dfs(node.subCategories, nextPath)) return true;
        }
        return false;
    }

    dfs(categories, []);
    return path;
}


// 선택한 카테고리 경로 (이름 배열)로 최종 categoryId 반환
export function getCategoryIdFromSteps(
    steps: string[],
    categories: Category[]
): number | null {
    let current: Category[] = categories;
    let lastMatch: Category | null = null;

    for (const step of steps) {
        const match = current.find(c => c.name === step);
        if (!match) return null;
        lastMatch = match;
        current = match.subCategories;
    }

    return lastMatch?.id ?? null;
}
