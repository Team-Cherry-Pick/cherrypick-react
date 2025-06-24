export function formatNumber(value: number | undefined): string {
    if (value === undefined || value === null || isNaN(value)) return '';
    return value.toLocaleString();
}
