import styles from './HeatBadge.module.css';
import { createBoundClassNames } from '@/utils/classNameBinder';
import { getHeatDisplay } from '@/utils/heat';

const cx = createBoundClassNames(styles);

interface HeatBadgeProps {
    heat: number;
    size?: 'small' | 'large';
}

export function HeatBadge({ heat, size = 'small' }: HeatBadgeProps) {
    const { icon: Icon, iconColor, textColor } = getHeatDisplay(heat);

    return (
        <div
            className={cx('badge', `size-${size}`)}
            style={
                {
                    color: `var(--color-${textColor.group}${textColor.key && `-${textColor.key}`}`,
                } as React.CSSProperties
            }
        >
            <span
                className={cx('icon')}
                style={{
                    color: `var(--color-${iconColor.group}${iconColor.key && `-${iconColor.key}`})`,
                }}
            >
                <Icon />
            </span>
            {heat}°
        </div>
    );
}
