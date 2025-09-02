import { Clock, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { FetchedDeal } from '@/types/Deal';
import { HeatBadge } from '../Badge';
import { getRelativeTime } from '@/utils/time';
import { formatNumber } from '@/utils/number';
import blackLogoIcon from '@/assets/icons/black-logo-Icon.svg';
import useIsMobileViewport from '@/hooks/useIsMobileViewport';
import styles from './CardDeal.module.css';

interface Props {
    deal: FetchedDeal;
}

export const CardDeal = ({ deal }: Props) => {
    const navigate = useNavigate();
    const isMobile = useIsMobileViewport();

    if (!deal) {
        return null;
    }

    const discountPercent =
        deal.price && deal.price.regularPrice > 0
            ? Math.round((1 - deal.price.discountedPrice / deal.price.regularPrice) * 100)
            : 0;

    return (
        <div
            className={`${styles.cardWrapper} ${deal.soldout ? 'ended' : ''}`}
            onClick={() => navigate(`/product/${deal.dealId}`)}
        >
            {deal.soldout && <div className={styles.overlay}>종료된 핫딜입니다</div>}
            <div className={styles.imageBox}>
                <img
                    className={styles.image}
                    src={`${deal.imageUrl?.url}`}
                    alt=""
                    onError={e => {
                        const img = e.currentTarget as HTMLImageElement;
                        img.src = blackLogoIcon;
                        img.style.height = '5rem';
                        img.style.width = '5rem';
                    }}
                />
                <div className={styles.heatBadgeWrapper}>
                    <HeatBadge heat={deal.heat} size={isMobile ? "small" : "large"} />
                </div>
            </div>
            <div className={styles.infoBox}>
                <div className={styles.title}>{deal.title}</div>

                {/* 모바일: 가격을 타이틀 바로 아래, 데스크탑: 기존 순서 */}
                {isMobile && (
                    <div className={styles.priceRow}>
                        {deal.price.priceType === 'VARIOUS' ? (
                            <span className={styles.variousPrice}>다양한 가격</span>
                        ) : (
                            <>
                                <span className={styles.percent}>{discountPercent}%</span>
                                <span className={styles.price}>
                                    {deal.price.priceType === 'KRW'
                                        ? `${formatNumber(deal.price.discountedPrice)}원`
                                        : `$ ${formatNumber(deal.price.discountedPrice)}`}
                                </span>
                            </>
                        )}
                    </div>
                )}

                {/* 데스크탑에서 보여줄 Tag Row */}
                <div className={styles.desktopTagRow}>
                    <span className={`${styles.tagBox} ${styles.storeTag}`}>{deal.store}</span>
                    {deal.infoTags.length > 0 && (
                        <span className={`${styles.tagBox} ${styles.infoTag}`}>
                            {deal.infoTags[0]}
                        </span>
                    )}
                    {deal.infoTags.length > 1 && (
                        <span className={`${styles.tagBox} ${styles.infoTag} ${styles.remainingTags}`}>
                            {deal.infoTags.length === 2 
                                ? deal.infoTags[1] 
                                : `${deal.infoTags[1]} 외 ${deal.infoTags.length - 2}`
                            }
                        </span>
                    )}
                </div>

                {/* 데스크탑: 가격을 기존 위치에 */}
                {!isMobile && (
                    <div className={styles.priceRow}>
                        {deal.price.priceType === 'VARIOUS' ? (
                            <span className={styles.variousPrice}>다양한 가격</span>
                        ) : (
                            <>
                                <span className={styles.percent}>{discountPercent}%</span>
                                <span className={styles.price}>
                                    {deal.price.priceType === 'KRW'
                                        ? `${formatNumber(deal.price.discountedPrice)}원`
                                        : `$ ${formatNumber(deal.price.discountedPrice)}`}
                                </span>
                            </>
                        )}
                    </div>
                )}

                {/* 모바일: 태그를 메타정보 바로 위에 */}
                {isMobile && (
                    <div className={styles.mobileTagRow}>
                        <span className={`${styles.tagBox} ${styles.storeTag}`}>{deal.store}</span>
                        {deal.infoTags.length > 0 && (
                            <span className={`${styles.tagBox} ${styles.infoTag}`}>
                                {deal.infoTags[0]}
                            </span>
                        )}
                        {deal.infoTags.length > 1 && (
                            <span className={`${styles.tagBox} ${styles.infoTag} ${styles.remainingTags}`}>
                                {deal.infoTags.length === 2 
                                    ? deal.infoTags[1] 
                                    : `${deal.infoTags[1]} 외 ${deal.infoTags.length - 2}`
                                }
                            </span>
                        )}
                    </div>
                )}

                <div className={styles.meta}>
                    <span className={styles.author} title={deal.nickname}>
                        {!isMobile && "by"} {deal.nickname}
                    </span>
                    <span className={styles.divider}>|</span>
                    <span>
                        <Clock /> {getRelativeTime(deal.createdAt)}
                    </span>
                    <span className={styles.divider}>|</span>
                    <span>
                        <MessageSquare /> {deal.totalComments}
                    </span>
                </div>
            </div>
        </div>
    );
};
