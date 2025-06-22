export function cleanTitle(raw: string): string {
    return raw.replace(/\[.*?\]/g, '').trim();
}

export function cleanStore(raw: string): string {
    return raw.split('[')[0].trim();
}
