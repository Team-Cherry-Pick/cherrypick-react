import styles from './DealCollection.module.css';
import { createBoundClassNames } from '@/utils/classNameBinder';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import FirstImgPc from '@/assets/intro/upload-pc.png';
import FirstImgMobile from '@/assets/intro/upload-mobile.png';
import SecondImg from '@/assets/intro/deals-pc.png';
import useIsMobileViewport from '@/hooks/useIsMobileViewport';

const cx = createBoundClassNames(styles);

export function DealCollection() {
  const { ref, isVisible } = useScrollAnimation();
  const isMobile = useIsMobileViewport();

  return (
    <section 
      ref={ref as React.RefObject<HTMLElement>}
      className={cx('section')}
      data-testid="section-deal-collection"
    >
      <div className={cx('container')}>
        <div className={cx('header')} style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(2rem)', transition: 'all 0.7s' }}>
          <div className={cx('badge')}>손쉬운 공유</div>
          <h2 className={cx('title')} data-testid="text-section-title">
            링크만 입력해도
            <br />
            <span className={cx('titleGradient')}>
              자동으로 콘텐츠 완성
            </span>
          </h2>
          <p className={cx('description')}>
            할인상품의 링크만 입력하면 상품 정보와 콘텐츠가 자동 생성됩니다. AI가 상품 핵심 정보를 작성해주어 누구나 빠르고 쉽게 콘텐츠를 만들 수 있어요.
          </p>
        </div>

        <div className={cx('content')} style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'scale(1)' : 'scale(0.95)', transition: 'all 0.7s 300ms' }}>
          <div className={cx('grid')}>
            <img
                src={isMobile ? FirstImgMobile : FirstImgPc}
                alt="링크 입력 자동 생성"
                className={cx('mobileImage')}
                data-testid="img-mobile-mockup"
              />
            <img
                src={SecondImg}
                alt="자동 콘텐츠 생성"
                className={cx('desktopImage')}
                data-testid="img-desktop-mockup"
              />
          </div>
        </div>
      </div>
    </section>
  );
}
