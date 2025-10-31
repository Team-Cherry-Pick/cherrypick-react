import styles from './Community.module.css';
import { createBoundClassNames } from '@/utils/classNameBinder';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import communityImg from '@/pages/intro/generated_images/Community_reviews_and_testimonials_screen_6d5926f1.png';

const cx = createBoundClassNames(styles);

export function Community() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section 
      ref={ref as React.RefObject<HTMLElement>}
      className={cx('section')}
      data-testid="section-community"
    >
      <div className={cx('container')}>
        <div className={cx('grid')}>
          <div className={cx('imageWrapper')} style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateX(0)' : 'translateX(-2rem)', transition: 'all 0.7s' }}>
            <img
              src={communityImg}
              alt="카테고리 및 검색 필터"
              className={cx('image')}
              data-testid="img-community"
            />
          </div>
          
          <div className={cx('content')} style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateX(0)' : 'translateX(2rem)', transition: 'all 0.7s 150ms' }}>
            <div className={cx('badge')}>
              스마트 필터
            </div>
            <h2 className={cx('title')} data-testid="text-community-title">
              원하는 핫딜만 콕콕!
              <br />
              <span className={cx('titleHighlight')}>세분화된 카테고리 & 정교한 검색 필터</span>
            </h2>
            <p className={cx('description')}>
              세분화된 카테고리로 원하는 상품을 빠르게 찾고,
              <br />
              정교한 필터로 내게 딱 맞는 핫딜만 골라 볼 수 있어요.
            </p>

            <ul className={cx('featureList')}>
              <li className={cx('featureItem')}>
                <div className={cx('checkIcon')}>
                  <svg className={cx('checkIconSvg')} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className={cx('featureContent')}>
                  <div className={cx('featureTitle')}>세분화된 카테고리 구조</div>
                  <div className={cx('featureDescription')}>대분류부터 소분류까지 상세하게 분류된 카테고리로 원하는 상품을 빠르게 찾아요</div>
                </div>
              </li>
              <li className={cx('featureItem')}>
                <div className={cx('checkIcon')}>
                  <svg className={cx('checkIconSvg')} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className={cx('featureContent')}>
                  <div className={cx('featureTitle')}>다양한 검색 필터</div>
                  <div className={cx('featureDescription')}>가격대, 할인율, 배송 옵션 등 원하는 조건으로 정확하게 필터링해요</div>
                </div>
              </li>
              <li className={cx('featureItem')}>
                <div className={cx('checkIcon')}>
                  <svg className={cx('checkIconSvg')} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className={cx('featureContent')}>
                  <div className={cx('featureTitle')}>맞춤형 정렬 옵션</div>
                  <div className={cx('featureDescription')}>최신순, 인기순, 할인율순 등 다양한 정렬 옵션으로 원하는 방식으로 탐색해요</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
