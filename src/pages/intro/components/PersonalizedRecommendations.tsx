import styles from './PersonalizedRecommendations.module.css';
import { createBoundClassNames } from '@/utils/classNameBinder';
import { useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { DollarSign, Sparkles, Star } from 'lucide-react';

const cx = createBoundClassNames(styles);

const personas = [
  {
    id: 1,
    name: '핫딜 탐색러',
    Icon: DollarSign,
    description: '각종 채널을 통해 혜택을 놓치지 않으려는 핫딜 탐색러',
  },
  {
    id: 2,
    name: '현명한 소비자',
    Icon: Sparkles,
    description: '가격 대비 최고의 선택을 하고 싶은 현명한 소비자',
  },
  {
    id: 3,
    name: '핫딜 크리에이터',
    Icon: Star,
    description: '링크 하나로 콘텐츠를 빠르게 만들어 수익을 내고 싶은 핫딜 크리에이터',
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
            사용자 추천
          </div>
          <h2 className={cx('title')} data-testid="text-personalized-title">
            Repik은
            <br/>
            이런 분께 추천드려요
          </h2>
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
