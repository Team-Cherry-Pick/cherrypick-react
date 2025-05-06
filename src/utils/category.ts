// 카테고리 관련 로직 유틸 함수
export interface CategoryObject {
    [key: string]: CategoryObject | number;
}

export type CategoryNode = number | CategoryObject;
/**
 * 선택된 카테고리 라벨 배열에서 ID 추출
 */
export const getCategoryIdFromSteps = (
    steps: string[],
    tree: CategoryNode
): number | null => {
    let current: CategoryNode = tree;

    for (const step of steps) {
        if (typeof current === 'number') return null;
        if (!(step in current)) return null;
        current = current[step];
    }

    return typeof current === 'number' ? current : null;
};
