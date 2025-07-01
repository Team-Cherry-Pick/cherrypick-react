export function formatNumber(value: number | undefined): string {
    if (value === undefined || value === null || isNaN(value)) return '';
    if (Number.isInteger(value)) {
        return value.toLocaleString();
    }
    return value.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 });
}
