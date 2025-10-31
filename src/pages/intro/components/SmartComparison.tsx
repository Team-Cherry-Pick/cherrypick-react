import styles from './SmartComparison.module.css';
import { createBoundClassNames } from '@/utils/classNameBinder';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import SecondImgPc from '@/assets/intro/point-pc.png';
import SecondImgMobile from '@/assets/intro/point-mobile.png';
import useIsMobileViewport from '@/hooks/useIsMobileViewport';

const cx = createBoundClassNames(styles);

export function SmartComparison() {
  const { ref, isVisible } = useScrollAnimation();
  const isMobile = useIsMobileViewport();

  return (
    <section 
      ref={ref as React.RefObject<HTMLElement>}
      className={cx('section')}
      data-testid="section-smart-comparison"
    >
      <div className={cx('container')}>
        <div className={cx('grid')}>
          <div className={cx('imageWrapper')} style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateX(0)' : 'translateX(-2rem)', transition: 'all 0.7s' }}>
            <img
              src={isMobile ? SecondImgMobile : SecondImgPc}
              alt="제휴 리워드"
              className={cx('image')}
              data-testid="img-comparison"
            />
          </div>
          
          <div className={cx('content')} style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateX(0)' : 'translateX(2rem)', transition: 'all 0.7s 150ms' }}>
            <div className={cx('badge')}>
              제휴 리워드 (준비중)
            </div>
            <h2 className={cx('title')} data-testid="text-comparison-title">
              공유만 해도
              <br />
              <span className={cx('titleHighlight')}>수익이 쌓이는 제휴 리워드</span>
            </h2>
            <p className={cx('description')}>
              공유한 링크를 통해 구매가 발생하면 핫딜 구매수수료가 포인트로 적립됩니다. 적립된 포인트는 온라인 상품권으로 교환해 사용할 수 있어요.
            </p>
            <ul className={cx('featureList')}>
              <li className={cx('featureItem')}>
                <div className={cx('checkIcon')}>
                  <svg className={cx('checkIconSvg')} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className={cx('featureContent')}>
                  <div className={cx('featureTitle')}>할인 공유로 수익 창출</div>
                  <div className={cx('featureDescription')}>공유한 링크를 통한 구매 시 수수료 적립</div>
                </div>
              </li>
              <li className={cx('featureItem')}>
                <div className={cx('checkIcon')}>
                  <svg className={cx('checkIconSvg')} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className={cx('featureContent')}>
                  <div className={cx('featureTitle')}>모바일 상품권 구매</div>
                  <div className={cx('featureDescription')}>적립된 포인트는 언제든 상품권으로 교환 가능</div>
                </div>
              </li>
              <li className={cx('featureItem')}>
                <div className={cx('checkIcon')}>
                  <svg className={cx('checkIconSvg')} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className={cx('featureContent')}>
                  <div className={cx('featureTitle')}>쉬운 제휴 마케팅 시작</div>
                  <div className={cx('featureDescription')}>복잡한 절차 없이 누구나 간편하게 시작</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
