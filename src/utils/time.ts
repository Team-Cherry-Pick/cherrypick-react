export function getRelativeTime(dateString: string) {
    const now = new Date();
    const date = new Date(dateString);
    const diff = now.getTime() - date.getTime();

    const seconds = Math.floor(diff / 1000);
    if (seconds < 60) return '방금 전';

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}분 전`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}시간 전`;

    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}일 전`;

    const weeks = Math.floor(days / 7);
    if (weeks < 5) return `${weeks}주 전`;

    const years = Math.floor(days / 365);
    if (years < 1) {
        const months = Math.floor(days / 30);
        return `${months}개월 전`;
    }
    return `${years}년 전`;
}
