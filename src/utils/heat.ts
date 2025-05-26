import { HiFire } from 'react-icons/hi2';

export type ThemeColorGroup = 'primary' | 'content' | 'neutral';
export type ThemeColorKey = string | number;

interface HeatDisplay {
    icon: typeof HiFire;
    iconColor: { group: ThemeColorGroup; key: ThemeColorKey };
    textColor: { group: ThemeColorGroup; key: ThemeColorKey };
}

export function getHeatDisplay(heat: number): HeatDisplay {
    if (heat >= 200) {
        return {
            icon: HiFire,
            iconColor: { group: 'primary', key: '' },
            textColor: { group: 'primary', key: '' },
        } as const;
    }
    if (heat > 0) {
        return {
            icon: HiFire,
            iconColor: { group: 'primary', key: '' },
            textColor: { group: 'content', key: 'main' },
        } as const;
    }
    return {
        icon: HiFire,
        iconColor: { group: 'neutral', key: 300 },
        textColor: { group: 'content', key: 'sub' },
    } as const;
}
