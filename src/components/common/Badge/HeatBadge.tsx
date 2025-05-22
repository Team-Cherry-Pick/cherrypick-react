import styled from 'styled-components';
import { getHeatDisplay } from '@/utils/heat';

interface HeatBadgeProps {
    heat: number;
    size?: 'small' | 'large';
}

const HeatBadge = ({ heat, size = 'small' }: HeatBadgeProps) => {
    const { emoji, color, textColor } = getHeatDisplay(heat);
    const isLarge = size === 'large';

    return (
        <BadgeWrapper $isLarge={isLarge} $textColor={textColor}>
            <Emoji style={{ color }}>{emoji}</Emoji>
            {heat}°
        </BadgeWrapper>
    );
};

export default HeatBadge;

const BadgeWrapper = styled.div<{ $isLarge: boolean; $textColor: string }>`
  background-color: ${({ theme }) => theme.colors.neutral[0]};
  color: ${({ $textColor }) => $textColor};
  padding: ${({ $isLarge }) => ($isLarge ? '6px 10px' : '4px 8px')};
  border-radius: 20px;
  font-size: ${({ $isLarge }) => ($isLarge ? '16px' : '12px')};
  display: flex;
  align-items: center;
  gap: 4px;
  font-weight: 600;
`;

const Emoji = styled.span`
  display: flex;
  align-items: center;
`;
