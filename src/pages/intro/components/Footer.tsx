import styles from './Footer.module.css';
import { createBoundClassNames } from '@/utils/classNameBinder';
import { SiApple, SiGoogleplay } from 'react-icons/si';

const cx = createBoundClassNames(styles);

export function Footer() {
  return (
    <footer className={cx('footer')} data-testid="section-footer">
      <div className={cx('container')}>
        <div className={cx('cta')}>
          <h2 className={cx('ctaTitle')}>
            지금 바로 시작하세요
          </h2>
          <p className={cx('ctaDescription')}>
            Repik과 함께 스마트한 쇼핑의 새로운 시대를 경험하세요
          </p>
          <div className={cx('buttonGroup')}>
            <button
              className={cx('downloadButton')}
              data-testid="button-footer-ios"
            >
              <SiApple style={{ width: '20px', height: '20px' }} />
              App Store
            </button>
            <button
              className={cx('downloadButton')}
              data-testid="button-footer-android"
            >
              <SiGoogleplay style={{ width: '20px', height: '20px' }} />
              Google Play
            </button>
          </div>
        </div>

        <div className={cx('footerContent')}>
          <div className={cx('linksGrid')}>
            <div className={cx('linkSection')}>
              <h3>서비스</h3>
              <ul className={cx('linkList')}>
                <li><a href="#" data-testid="link-hot-deals">핫딜 모음</a></li>
                <li><a href="#" data-testid="link-price-compare">가격 비교</a></li>
                <li><a href="#" data-testid="link-categories">카테고리</a></li>
              </ul>
            </div>
            <div className={cx('linkSection')}>
              <h3>회사</h3>
              <ul className={cx('linkList')}>
                <li><a href="#" data-testid="link-about">회사 소개</a></li>
                <li><a href="#" data-testid="link-careers">채용</a></li>
                <li><a href="#" data-testid="link-blog">블로그</a></li>
              </ul>
            </div>
            <div className={cx('linkSection')}>
              <h3>지원</h3>
              <ul className={cx('linkList')}>
                <li><a href="#" data-testid="link-support">고객센터</a></li>
                <li><a href="#" data-testid="link-faq">FAQ</a></li>
                <li><a href="#" data-testid="link-notices">공지사항</a></li>
              </ul>
            </div>
            <div className={cx('linkSection')}>
              <h3>법적고지</h3>
              <ul className={cx('linkList')}>
                <li><a href="#" data-testid="link-terms">이용약관</a></li>
                <li><a href="#" data-testid="link-privacy">개인정보처리방침</a></li>
                <li><a href="#" data-testid="link-business">사업자정보</a></li>
              </ul>
            </div>
          </div>

          <div className={cx('bottomBar')}>
            <div className={cx('logo')}>
              <div className={cx('logoIcon')}>
                R
              </div>
              <span className={cx('logoText')}>Repik</span>
            </div>
            <p className={cx('copyright')}>
              © 2024 Repik. All rights reserved.
            </p>
            <div className={cx('socialLinks')}>
              <a href="#" className={cx('socialLink')} data-testid="link-social-facebook">
                <svg className={cx('socialIcon')} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className={cx('socialLink')} data-testid="link-social-twitter">
                <svg className={cx('socialIcon')} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="#" className={cx('socialLink')} data-testid="link-social-instagram">
                <svg className={cx('socialIcon')} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
