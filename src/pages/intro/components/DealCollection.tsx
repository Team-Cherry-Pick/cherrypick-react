import styles from './DealCollection.module.css';
import { createBoundClassNames } from '@/utils/classNameBinder';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

import foodDealsImg from '@/pages/intro/generated_images/Food_lifestyle_deals_app_mockup_16aeb1ba.png';
import fashionDealsImg from '@/pages/intro/generated_images/Fashion_beauty_deals_app_screen_7020ddf7.png';
import digitalDealsImg from '@/pages/intro/generated_images/Digital_electronics_deals_app_mockup_da2baa4d.png';
import travelDealsImg from '@/pages/intro/generated_images/Travel_leisure_deals_app_interface_d81c324d.png';

import foodDesktopImg from '@/pages/intro/generated_images/Desktop_deals_comparison_interface_b33de156.png';
import fashionDesktopImg from '@/pages/intro/generated_images/Electronics_deals_website_desktop_view_3ab93e6a.png';
import digitalDesktopImg from '@/pages/intro/generated_images/Personalized_recommendations_dashboard_desktop_5efcc2ba.png';
import travelDesktopImg from '@/pages/intro/generated_images/Desktop_deals_comparison_interface_b33de156.png';

const cx = createBoundClassNames(styles);

const categories = [
  { id: 1, label: '식품/생활', mobileImg: foodDealsImg, desktopImg: foodDesktopImg },
  { id: 2, label: '패션/뷰티', mobileImg: fashionDealsImg, desktopImg: fashionDesktopImg },
  { id: 3, label: '디지털/가전', mobileImg: digitalDealsImg, desktopImg: digitalDesktopImg },
  { id: 4, label: '여행/레저', mobileImg: travelDealsImg, desktopImg: travelDesktopImg },
];

export function DealCollection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section 
      ref={ref as React.RefObject<HTMLElement>}
      className={cx('section')}
      data-testid="section-deal-collection"
    >
      <div className={cx('container')}>
        <div className={cx('header')} style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(2rem)', transition: 'all 0.7s' }}>
          <div className={cx('badge')}>자동 생성</div>
          <h2 className={cx('title')} data-testid="text-section-title">
            링크만 입력해도
            <br />
            <span className={cx('titleGradient')}>
              자동으로 콘텐츠 완성
            </span>
          </h2>
          <p className={cx('description')}>
            힘들게 작성하지 않아도, 상품 링크만 입력하면 상품 정보와 콘텐츠가 자동 생성됩니다.
            <br />
            AI가 상품 핵심 포인트를 정리해주어 누구나 빠르고 쉽게 핫딜 콘텐츠를 만들 수 있어요.
          </p>
        </div>

        <div className={cx('content')} style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'scale(1)' : 'scale(0.95)', transition: 'all 0.7s 300ms' }}>
          <div className={cx('grid')}>
            <div className={cx('imageWrapper')}>
              <img
                src={categories[0].mobileImg}
                alt="링크 입력 자동 생성"
                className={cx('mobileImage')}
                data-testid="img-mobile-mockup"
              />
            </div>
            <div className={cx('imageWrapper')}>
              <img
                src={categories[0].desktopImg}
                alt="자동 콘텐츠 생성"
                className={cx('desktopImage')}
                data-testid="img-desktop-mockup"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
