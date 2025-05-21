// utils/date.ts
export const getTimeAgo = (isoString: string): string => {
    const now = new Date();
    const created = new Date(isoString);
    const diffMs = now.getTime() - created.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);

    if (diffDay >= 1) return `${diffDay}일 전`;
    if (diffHour >= 1) return `${diffHour}시간 전`;
    if (diffMin >= 1) return `${diffMin}분 전`;
    return `방금 전`;
};
