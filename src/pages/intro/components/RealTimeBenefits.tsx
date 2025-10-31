import styles from './RealTimeBenefits.module.css';
import { createBoundClassNames } from '@/utils/classNameBinder';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import alertsImg from '@/pages/intro/generated_images/Real-time_price_alerts_notification_screen_678d2f3f.png';

const cx = createBoundClassNames(styles);

export function RealTimeBenefits() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section 
      ref={ref as React.RefObject<HTMLElement>}
      className={cx('section')}
      data-testid="section-realtime-benefits"
    >
      <div className={cx('container')}>
        <div className={cx('grid')}>
          <div className={cx('content', 'contentLeft')} style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateX(0)' : 'translateX(2rem)', transition: 'all 0.7s' }}>
            <div className={cx('badge')}>
              랭킹 알고리즘
            </div>
            <h2 className={cx('title')} data-testid="text-benefits-title">
              조회수와 전환율을 반영한
              <br />
              <span className={cx('titleHighlight')}>리픽만의 랭킹</span>
            </h2>
            <p className={cx('description')}>
              단순히 인기 많은 핫딜이 아닌, 실제 구매로 이어지는 알짜배기 핫딜을 우선 노출합니다.
              <br />
              조회수와 전환율을 함께 반영하여 더욱 똑똑한 추천을 제공해요.
            </p>
            <ul className={cx('featureList')}>
              <li className={cx('featureItem')}>
                <div className={cx('checkIcon')}>
                  <svg className={cx('checkIconSvg')} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className={cx('featureContent')}>
                  <div className={cx('featureTitle')}>조회수 + 전환율 반영</div>
                  <div className={cx('featureDescription')}>많이 봤을 뿐 아니라 실제 구매로 이어진 핫딜 우선 노출</div>
                </div>
              </li>
              <li className={cx('featureItem')}>
                <div className={cx('checkIcon')}>
                  <svg className={cx('checkIconSvg')} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className={cx('featureContent')}>
                  <div className={cx('featureTitle')}>알짜 핫딜 우선 추천</div>
                  <div className={cx('featureDescription')}>검증된 가성비 최고의 상품만 선별하여 보여드려요</div>
                </div>
              </li>
              <li className={cx('featureItem')}>
                <div className={cx('checkIcon')}>
                  <svg className={cx('checkIconSvg')} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className={cx('featureContent')}>
                  <div className={cx('featureTitle')}>실시간 랭킹 업데이트</div>
                  <div className={cx('featureDescription')}>최신 트렌드를 반영한 실시간 핫딜 순위 제공</div>
                </div>
              </li>
            </ul>
          </div>
          
          <div className={cx('imageWrapper', 'imageRight')} style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateX(0)' : 'translateX(-2rem)', transition: 'all 0.7s 150ms' }}>
            <img
              src={alertsImg}
              alt="리픽 랭킹"
              className={cx('image')}
              data-testid="img-alerts"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
