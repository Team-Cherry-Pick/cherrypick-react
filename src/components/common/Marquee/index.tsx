import React, { useMemo } from 'react';
import styles from './Marquee.module.css';

type Direction = 'ltr' | 'rtl';

interface MarqueeProps {
	icons: { src: string; alt?: string }[];
	height?: number; // px
	gap?: number; // px
	durationSec?: number; // seconds for one loop
	direction?: Direction; // default 'ltr' (좌 -> 우)
	className?: string;
}

type CSSVars = React.CSSProperties & { [key: `--${string}`]: string };

/**
 * Marquee - 끊김 없는 무한 스크롤 아이콘 행
 * 동일한 아이콘 목록을 나란히 2회 렌더링하고, 트랙을 50%만 이동시키며 반복합니다.
 */
export const Marquee: React.FC<MarqueeProps> = ({
	icons,
	height = 40,
	gap = 24,
	durationSec = 20,
	direction = 'ltr',
	className,
}) => {
	const rootStyle = useMemo<CSSVars>(() => ({
		['--marquee-height']: `${height}px`,
		['--marquee-gap']: `${gap}px`,
		['--marquee-duration']: `${durationSec}s`,
	}), [height, gap, durationSec]);

	const containerClass = [
		styles.marquee,
		direction === 'rtl' ? styles.rtl : '',
		className,
	]
		.filter(Boolean)
		.join(' ');

	const list = icons ?? [];

	return (
		<div className={containerClass} style={rootStyle} aria-hidden>
			<div className={styles.track}>
				<ul className={styles.items}>
					{list.map((icon, idx) => (
						<li key={`a-${idx}`} className={styles.item}>
							<img className={styles.iconImg} src={icon.src} alt={icon.alt ?? ''} />
						</li>
					))}
				</ul>
				<ul className={styles.items} aria-hidden>
					{list.map((icon, idx) => (
						<li key={`b-${idx}`} className={styles.item}>
							<img className={styles.iconImg} src={icon.src} alt={icon.alt ?? ''} />
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default Marquee;

