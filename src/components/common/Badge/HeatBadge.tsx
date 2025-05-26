import styled from 'styled-components';
import { getHeatDisplay } from '@/utils/heat';
import type { ThemeColorGroup, ThemeColorKey } from '@/utils/heat';

interface HeatBadgeProps {
    heat: number;
    size?: 'small' | 'large';
}

const HeatBadge = ({ heat, size = 'small' }: HeatBadgeProps) => {
    const { icon: Icon, iconColor, textColor } = getHeatDisplay(heat);
    const isLarge = size === 'large';

    return (
        <BadgeWrapper
            $isLarge={isLarge}
            $colorGroup={textColor.group}
            $colorKey={textColor.key}
        >
            <IconWrapper
                $colorGroup={iconColor.group}
                $colorKey={iconColor.key}
            >
                <Icon />
            </IconWrapper>
            {heat}°
        </BadgeWrapper>
    );
};

export default HeatBadge;

const BadgeWrapper = styled.div<{
    $isLarge: boolean;
    $colorGroup: ThemeColorGroup;
    $colorKey: ThemeColorKey;
}>`
  background-color: ${({ theme }) => theme.colors.neutral[0]};
  color: ${({ theme, $colorGroup, $colorKey }) => {
        const groupValue = theme.colors[$colorGroup];
        if (typeof groupValue === 'string') return groupValue;

        return (groupValue as Record<string | number, string>)[$colorKey];
    }};

  padding: ${({ $isLarge }) => ($isLarge ? '6px 10px' : '4px 8px')};
  border-radius: 20px;
  font-size: ${({ $isLarge }) => ($isLarge ? '16px' : '12px')};
  display: flex;
  align-items: center;
  gap: 4px;
  font-weight: 600;
`;

const IconWrapper = styled.span<{
    $colorGroup: ThemeColorGroup;
    $colorKey: ThemeColorKey;
}>`
  display: flex;
  align-items: center;
  color: ${({ theme, $colorGroup, $colorKey }) => {
        const group = theme.colors[$colorGroup];
        if (typeof group === 'string') return group;
        return (group as Record<string | number, string>)[$colorKey];
    }};
`;
