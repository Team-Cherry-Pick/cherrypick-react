import RedFireIcon from '@/assets/icons/red-fire.svg?react';
import GrayFireIcon from '@/assets/icons/gray-fire.svg?react';

export type ThemeColorGroup = 'primary' | 'content' | 'neutral';
export type ThemeColorKey = string | number;

interface HeatDisplay {
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
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

/**
 * 핫딜 점수를 소숫점 형태로 포맷팅
 * 0.0은 "0"으로, 그 외는 소숫점 1자리까지 표시
 */
export function formatHeatScore(heat: number): string {
    if (heat === 0) {
        return '0';
    }
    return heat.toFixed(1);
}
