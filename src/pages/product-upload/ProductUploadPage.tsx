import { MdArrowForwardIos } from 'react-icons/md';
import styles from './ProductUploadPage.module.css';
import DefaultLayout from '@/components/layout/DefaultLayout';
import { UploadButton } from '@/components/common/Button';
import {
    DiscountInfo,
    LinkInfo,
    PriceInfo,
    ProductDetail,
    ProductImageUpload,
    ProductInfo,
    ShippingInfo,
} from './components';
import { useAtom } from 'jotai';
import { imageFilesAtom, newDealAtom } from '@/store';
import { uploadImage } from '@/services/apiImage';
import { uploadDeal } from '@/services/apiDeal';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProductUploadPage() {
    const navigate = useNavigate();
    const [deal, setDeal] = useAtom(newDealAtom);
    const [images] = useAtom(imageFilesAtom);

    const [valid, setValid] = useState<
        'Title' | 'Category' | 'Image' | 'OriginalUrl' | 'Store' | 'Shipping' | 'Content' | null
    >(null);

    const isTitleValid = deal.title.length > 0;
    const isCategoryValid = deal.categoryId !== undefined;
    const isImageValid = images.images.length > 0;
    const isOriginalUrlValid = deal.originalUrl.length > 0;
    const isStoreValid = deal.storeId !== undefined || deal.storeName.length > 0;
    const isShippingValid =
        !(deal.shipping.shippingType === 'CONDITIONAL' && deal.shipping.shippingRule.length === 0) &&
        !(
            (deal.shipping.shippingType === 'KRW' || deal.shipping.shippingType === 'USD') &&
            deal.shipping.shippingPrice === 0
        );
    const isContentValid = deal.content.length > 0;

    const handleSubmit = async () => {
        if (valid) {
            switch (valid) {
                case 'Title':
                    alert('제목을 입력해주세요.');
                    break;
                case 'Category':
                    alert('카테고리를 선택해주세요.');
                    break;
                case 'Image':
                    alert('이미지를 추가해주세요.');
                    break;
                case 'OriginalUrl':
                    alert('링크 정보를 확인해주세요.');
                    break;
                case 'Store':
                    alert('스토어를 선택해주세요.');
                    break;
                case 'Shipping':
                    alert('배송 정보를 확인해주세요.');
                    break;
                case 'Content':
                    alert('상품에 대한 설명을 추가해주세요.');
            }
            return;
        }

        if (images.images.length > 0) {
            setDeal({
                ...deal,
                imageIds: (await uploadImage(images)).map(image => image.imageId),
            });
        }

        const uploadDealData = {
            title: deal.title,
            categoryId: deal.categoryId,
            imageIds: deal.imageIds,
            originalUrl: deal.originalUrl,
            storeId: deal.storeId,
            storeName: deal.storeName,
            price: {
                priceType: deal.price.priceType,
                regularPrice: deal.price.regularPrice,
                discountedPrice: deal.price.discountedPrice,
            },
            shipping: {
                shippingType: deal.shipping.shippingType,
                shippingPrice: deal.shipping.shippingPrice,
                shippingRule: deal.shipping.shippingRule,
            },
            content: deal.content,
            discountIds: deal.discountIds,
            discountNames: deal.discountNames,
            discountDescription: deal.discountDescription,
        };

        uploadDeal(uploadDealData)
            .then(() => {
                navigate('/');
            })
            .catch(error => {
                alert('핫딜 게시글 작성 실패');
                console.error(error);
            });
    };

    // 유효성 검사
    useEffect(() => {
        if (!isImageValid) {
            setValid('Image');
        } else if (!isTitleValid) {
            setValid('Title');
        } else if (!isCategoryValid) {
            setValid('Category');
        } else if (!isOriginalUrlValid) {
            setValid('OriginalUrl');
        } else if (!isStoreValid) {
            setValid('Store');
        } else if (!isShippingValid) {
            setValid('Shipping');
        } else if (!isContentValid) {
            setValid('Content');
        } else {
            setValid(null);
        }
    }, [
        isCategoryValid,
        isContentValid,
        isImageValid,
        isOriginalUrlValid,
        isShippingValid,
        isStoreValid,
        isTitleValid,
    ]);

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
                            <UploadButton disabled={valid !== null} onClick={handleSubmit}>
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
