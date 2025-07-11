import styles from './HeatBadge.module.css';
import { createBoundClassNames } from '@/utils/classNameBinder';
import { getHeatDisplay } from '@/utils/heat';

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
                <Icon style={{ width: size === 'large' ? 24 : 20, height: size === 'large' ? 24 : 20, verticalAlign: 'middle' }} />
            </span>
            <span className={cx('heat-value')}>{heat}°</span>
        </div>
    );
}
