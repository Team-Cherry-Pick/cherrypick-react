import styles from './HeatBadge.module.css';
import { createBoundClassNames } from '@/utils/classNameBinder';
import { getHeatDisplay, formatHeatScore } from '@/utils/heat';

const cx = createBoundClassNames(styles);

interface HeatBadgeProps {
    heat: number;
    size?: 'small' | 'large';
}

export function HeatBadge({ heat, size = 'small' }: HeatBadgeProps) {
    const { icon: Icon, textColor } = getHeatDisplay(heat);

    return (
        <div
            className={cx('badge', `size-${size}`)}
            style={
                {
                    color: `var(--color-${textColor.group}${textColor.key && `-${textColor.key}`})`,
                } as React.CSSProperties
            }
        >
            <span className={cx('icon')}>
                <Icon style={{ width: size === 'large' ? 18 : 18, height: size === 'large' ? 18 : 18, verticalAlign: 'middle' }} />
            </span>
            <span className={cx('heat-value')}>{formatHeatScore(heat)}°</span>
        </div>
    );
}
