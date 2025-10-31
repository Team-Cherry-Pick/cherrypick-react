import styles from './PersonalizedRecommendations.module.css';
import { createBoundClassNames } from '@/utils/classNameBinder';
import { useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { DollarSign, Sparkles, Star } from 'lucide-react';

const cx = createBoundClassNames(styles);

const personas = [
  {
    id: 1,
    name: '알뜰 쇼퍼',
    Icon: DollarSign,
    description: '최대 할인율과 가성비를 중시하는 당신을 위한 추천',
  },
  {
    id: 2,
    name: '트렌드 세터',
    Icon: Sparkles,
    description: '최신 제품과 인기 상품을 먼저 만나는 즐거움',
  },
  {
    id: 3,
    name: '품질 우선주의자',
    Icon: Star,
    description: '검증된 제품과 프리미엄 브랜드의 특별한 혜택',
  },
];

export function PersonalizedRecommendations() {
  const [activePersona, setActivePersona] = useState(0);
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section 
      ref={ref as React.RefObject<HTMLElement>}
      className={cx('section')}
      data-testid="section-personalized"
    >
      <div className={cx('container')}>
        <div className={cx('header')} style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(2rem)', transition: 'all 0.7s' }}>
          <div className={cx('badge')}>
            맞춤 추천
          </div>
          <h2 className={cx('title')} data-testid="text-personalized-title">
            당신의 쇼핑 취향,
            <br />
            <span className={cx('titleGradient')}>
              AI가 정확히 알아요
            </span>
          </h2>
          <p className={cx('description')}>
            구매 패턴과 선호도를 분석해 딱 맞는 상품만 추천해드립니다
          </p>
        </div>

        <div className={cx('personaButtons')} style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(2rem)', transition: 'all 0.7s 150ms' }}>
          {personas.map((persona, index) => {
            const Icon = persona.Icon;
            return (
              <button
                key={persona.id}
                className={cx('personaButton', { personaButtonActive: activePersona === index })}
                onClick={() => setActivePersona(index)}
                data-testid={`button-persona-${index}`}
              >
                <Icon style={{ width: '20px', height: '20px' }} />
                <span>{persona.name}</span>
              </button>
            );
          })}
        </div>

        <div className={cx('content')} style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'scale(1)' : 'scale(0.95)', transition: 'all 0.7s 300ms' }}>
          <div className={cx('personaDescription')}>
            <p>{personas[activePersona].description}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
