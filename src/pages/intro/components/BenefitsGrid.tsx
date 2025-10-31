import styles from './BenefitsGrid.module.css';
import { createBoundClassNames } from '@/utils/classNameBinder';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

import giftIcon from '@/pages/intro/generated_images/Gift_benefit_icon_illustration_fc5cc9a6.png';
import cashbackIcon from '@/pages/intro/generated_images/Cashback_rewards_icon_illustration_5ddec336.png';
import notificationIcon from '@/pages/intro/generated_images/Notification_bell_icon_illustration_6282c5ee.png';
import shieldIcon from '@/pages/intro/generated_images/Security_trust_shield_icon_6b934034.png';
import starIcon from '@/pages/intro/generated_images/Premium_membership_star_icon_67783596.png';
import mobileIcon from '@/pages/intro/generated_images/Mobile_app_feature_icon_2fd9e642.png';

const cx = createBoundClassNames(styles);

const benefits = [
  {
    icon: giftIcon,
    title: '신규 가입 혜택',
    description: '회원가입 시 즉시 사용 가능한 10,000원 쿠폰과 추가 할인 혜택을 드려요',
  },
  {
    icon: cashbackIcon,
    title: '캐시백 리워드',
    description: '구매할 때마다 최대 5% 적립! 쌓인 포인트로 다음 쇼핑을 더 저렴하게',
  },
  {
    icon: notificationIcon,
    title: '실시간 알림',
    description: '타임세일, 재입고, 가격 하락을 놓치지 않도록 즉시 알려드려요',
  },
  {
    icon: shieldIcon,
    title: '안전한 거래',
    description: '검증된 판매자와 안전 결제 시스템으로 믿고 쇼핑하세요',
  },
  {
    icon: starIcon,
    title: '프리미엄 멤버십',
    description: '무료 배송, 독점 할인, 우선 구매 등 VIP 전용 혜택을 누리세요',
  },
  {
    icon: mobileIcon,
    title: '모바일 전용 특가',
    description: '앱에서만 만날 수 있는 특별한 가격과 한정 딜을 만나보세요',
  },
];

export function BenefitsGrid() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section 
      ref={ref as React.RefObject<HTMLElement>}
      className={cx('section')}
      data-testid="section-benefits"
    >
      <div className={cx('container')}>
        <div className={cx('header')} style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(2rem)', transition: 'all 0.7s' }}>
          <div className={cx('badge')}>특별한 혜택</div>
          <h2 className={cx('title')} data-testid="text-benefits-title">
            Repik과 함께하면
            <br />
            <span className={cx('titleGradient')}>
              이런 혜택이 기다려요
            </span>
          </h2>
          <p className={cx('description')}>
            회원님만을 위한 특별한 혜택들을 지금 바로 경험하세요
          </p>
        </div>

        <div className={cx('grid')}>
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className={cx('card')}
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(2rem)',
                transition: `all 0.7s ${150 + index * 100}ms`,
              }}
              data-testid={`card-benefit-${index}`}
            >
              <div className={cx('iconWrapper')}>
                <img 
                  src={benefit.icon} 
                  alt={benefit.title}
                  className={cx('icon')}
                />
              </div>
              <h3 className={cx('cardTitle')}>{benefit.title}</h3>
              <p className={cx('cardDescription')}>
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
