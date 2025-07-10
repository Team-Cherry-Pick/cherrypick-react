import RedFireIcon from '@/assets/icons/red-fire.svg?url';
import GrayFireIcon from '@/assets/icons/gray-fire.svg?url';

export type ThemeColorGroup = 'primary' | 'content' | 'neutral';
export type ThemeColorKey = string | number;

interface HeatDisplay {
    icon: string;
    textColor: { group: ThemeColorGroup; key: ThemeColorKey };
}

export function getHeatDisplay(heat: number): HeatDisplay {
    if (heat >= 200) {
        return {
            icon: RedFireIcon,
            textColor: { group: 'primary', key: '' },
        } as const;
    }
    if (heat > 0) {
        return {
            icon: RedFireIcon,
            textColor: { group: 'content', key: 'main' },
        } as const;
    }
    return {
        icon: GrayFireIcon,
        textColor: { group: 'content', key: 'sub' },
    } as const;
}
