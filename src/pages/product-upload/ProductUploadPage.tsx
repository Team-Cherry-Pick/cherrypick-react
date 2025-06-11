import { MdArrowForwardIos } from 'react-icons/md';
import styles from './ProductUploadPage.module.css';
import DefaultLayout from '@/components/layout/DefaultLayout';
import { UploadButton } from '@/components/common/Button';
import ProductImageUpload from './components/ProductImageUpload';
import ProductInfo from './components/ProductInfo';
import LinkInfo from './components/LinkInfo';
import PriceInfo from './components/PriceInfo';
import ShippingInfo from './components/ShippingInfo';
import ProductDetail from './components/ProductDetail';
import DiscountInfo from './components/DiscountInfo';

export default function ProductUploadPage() {
    const handleSubmit = () => {
        console.log('업로드할 deal 데이터:');
        alert('업로드할 deal 데이터:');
    };

    return (
        <>
            <DefaultLayout>
                <div className={styles.topBackground}>
                    <h1 className={styles.title}>
                        쇼핑몰에서 찾은 <b className={styles.semibold}>저렴한 할인상품</b>을 공유하세요!
                    </h1>
                    <p className={styles.description}>
                        게시물 양식에 대한 내용은 최대한 자세하게 작성해주세요.
                        <br />
                        다른 사람들이 사용자님의 핫딜을 구매할 가능성을 높일 수 있어요.
                    </p>
                </div>
                <div className={styles.main}>
                    <div className={styles.guideButtonWrapper}>
                        <button className={styles.guideButton}>
                            <p>작성 및 유의사항 가이드</p>
                            <MdArrowForwardIos className={styles.arrowIcon} />
                        </button>
                    </div>
                    <div className={styles.contentWrapper}>
                        <div className={styles.uploadButtonWrapper}>
                            <UploadButton disabled={true} onClick={handleSubmit}>
                                업로드
                            </UploadButton>
                        </div>
                        <div className={styles.sectionWrapper}>
                            <div className={styles.section}>
                                <div className={styles.sectionTitle}>이미지</div>
                                <ProductImageUpload />
                            </div>
                        </div>
                        <div className={styles.sectionDivider} />
                        <div className={styles.sectionWrapper}>
                            <div className={styles.section}>
                                <div className={styles.sectionTitle}>상품 정보</div>
                                <ProductInfo />
                            </div>
                            <div className={styles.section}>
                                <div className={styles.sectionTitle}>링크 정보</div>
                                <LinkInfo />
                            </div>
                        </div>
                        <div className={styles.sectionDivider} />
                        <div className={styles.sectionWrapper}>
                            <div className={styles.section}>
                                <div className={styles.sectionTitle}>가격 정보</div>
                                <PriceInfo />
                            </div>
                            <div className={styles.section}>
                                <div className={styles.sectionTitle}>배송 정보</div>
                                <ShippingInfo />
                            </div>
                        </div>
                        <div className={styles.sectionDivider} />
                        <div className={styles.sectionWrapper}>
                            <div className={styles.section}>
                                <div className={styles.sectionTitle}>상세 정보</div>
                                <ProductDetail />
                            </div>
                            <div className={styles.section}>
                                <div className={styles.sectionTitle}>할인 정보(선택)</div>
                                <DiscountInfo />
                            </div>
                        </div>
                    </div>
                </div>
            </DefaultLayout>
        </>
    );
}
