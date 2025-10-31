import styles from './Hero.module.css';
import { createBoundClassNames } from '@/utils/classNameBinder';
import heroBackground from '../generated_images/agreement-2548138_1920.jpg';

const cx = createBoundClassNames(styles);

export function Hero() {

  return (
    <section 
      className={cx('section')}
      style={{ backgroundImage: `linear-gradient(0deg, rgba(13, 16, 23, 0.55), rgba(13, 16, 23, 0.35)), url(${heroBackground})` }}
      data-testid="section-hero"
    >
      <div className={cx('container')}>
        <div className={cx('layout')}>
          <div className={cx('textColumn')}>
            <h1 
              className={cx('headline')}
              data-testid="text-hero-headline"
            >
              <span className={cx('headlineLead')}>
                매일 쏟아지는 할인 속
              </span>
              <span 
                className={cx('headlineEmphasis', 'headlineSparkle')}
                data-text="놓치면 아쉬운 특가할인"
              >
                놓치면 아쉬운 특가할인
              </span>
            </h1>
            <p 
              className={cx('subheadline')}
              data-testid="text-hero-subheadline"
            >
              좋은 특가할인을 공유하세요.
              <br />
              또는 구경만 해도 좋아요.
              <br />
              리픽에선, 어느쪽이든 돈이 되니까요!
            </p>

            <a href="#" className={cx('storeButton')} data-testid="button-download-ios">
                <span>지금 시작하기</span>
              </a>
          </div>
        </div>
      </div>

      <div className={cx('scrollIndicator')}>
        <div className={cx('scrollIndicatorInner')}>
          <div className={cx('scrollIndicatorDot')} />
        </div>
      </div>
    </section>
  );
}
