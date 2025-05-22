export function getHeatDisplay(heat: number) {
    if (heat >= 200) {
        return { emoji: '🔥', color: '#ff3300', textColor: '#ff3300' };
    }
    if (heat > 0) {
        return { emoji: '🔥', color: '#ff6600', textColor: '#000000' };
    }
    return { emoji: '🔥', color: '#999999', textColor: '#999999' };
}
