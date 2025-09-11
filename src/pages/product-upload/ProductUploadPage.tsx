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
import { newDealAtom } from '@/store';
import { fetchDetailedDeal, uploadDeal, updateDeal } from '@/services/apiDeal';
import { GA4Events } from '@/utils/ga4';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { DealImage, UpdateDeal } from '@/types/Deal';
import { useImageUpload } from '@/hooks/useImageUpload';
import { selectedDiscountAtom } from '@/store/search';
import { uploadSelectedCategoryAtom } from '@/store/category';

export default function ProductUploadPage() {
    const navigate = useNavigate();
    const { dealId } = useParams();

    const [deal, setDeal] = useAtom(newDealAtom);
    const imageUpload = useImageUpload();
    const [, setSelectedDiscount] = useAtom(selectedDiscountAtom);
    const [, setUploadSelectedCategory] = useAtom(uploadSelectedCategoryAtom);

    const [valid, setValid] = useState<
        'Title' | 'Category' | 'Image' | 'OriginalUrl' | 'Store' | 'Shipping' | 'Content' | null
    >(null);

    const isTitleValid = deal.title.length > 0;
    const isCategoryValid = deal.categoryId !== undefined;
    const isImageValid = imageUpload.images.length > 0;
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

        const imageIds = imageUpload.images.map(image => image.imageId);
        
        setDeal({
            ...deal,
            imageIds,
        });

        console.log(deal);

        const uploadDealData = {
            title: deal.title,
            categoryId: deal.categoryId,
            imageIds,
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
        };

        // 수정 모드인지 확인하고 적절한 API 호출
        if (dealId) {
            // 수정 모드: updateDeal 사용
            const updateDealData: UpdateDeal = {
                ...uploadDealData,
                dealId: Number(dealId),
            };
            updateDeal(updateDealData).then(() => {
                GA4Events.updateDeal(Number(dealId), deal.categoryId, deal.storeId);
                navigate(`/product/${dealId}`);
                window.location.reload();
            });
        } else {
            // 새 게시글 모드: uploadDeal 사용
            uploadDeal(uploadDealData).then(() => {
                GA4Events.uploadDeal(deal.categoryId, deal.storeId);
                navigate('/');
            });
        }
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

    useEffect(() => {
        const init = async () => {
            // 수정 모드
            if (dealId) {
                try {
                    const d = await fetchDetailedDeal(dealId);
                    setDeal({
                        title: d.title,
                        categoryId: d.categoryId,
                        imageIds: d.imageUrls ? d.imageUrls.map((img: DealImage) => img.imageId) : [],
                        originalUrl: d.originalUrl,
                        storeId: d.storeId ? d.storeId : undefined,
                        storeName: d.store?.storeName || '',
                        price: {
                            priceType: d.price.priceType,
                            regularPrice: d.price.regularPrice,
                            discountedPrice: d.price.discountedPrice,
                        },
                        shipping: {
                            shippingType: d.shipping.shippingType,
                            shippingPrice: d.shipping.shippingPrice,
                            shippingRule: d.shipping.shippingRule,
                        },
                        content: d.content || '',
                        discountIds: d.discountIds || [],
                        discountNames: d.discountName ? d.discountName.split(',').map(name => name.trim()) : [],
                    });
                    // discountIds/discountName을 selectedDiscountAtom에도 반영
                    setSelectedDiscount(
                        (d.discountIds || []).map((id: number, idx: number) => ({
                            discountId: id,
                            name: d.discountName
                                ? d.discountName.split(',').map((n: string) => n.trim())[idx] || ''
                                : '',
                        }))
                    );

                    // 카테고리 정보를 uploadSelectedCategoryAtom에 설정
                    if (d.categoryId && d.categorys && d.categorys.length > 0) {
                        setUploadSelectedCategory({
                            categoryId: d.categoryId,
                            path: d.categorys,
                        });
                    }

                    if (d.imageUrls && d.imageUrls.length > 0) {
                        imageUpload.setImages(
                            d.imageUrls.map((img: DealImage) => ({
                                imageId: img.imageId,
                                imageUrl: img.url,
                                indexes: img.indexes,
                            }))
                        );
                    }
                } catch {
                    alert('핫딜 정보를 불러오지 못했습니다.');
                }
            } 
        };
        init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dealId, setDeal, setSelectedDiscount, setUploadSelectedCategory]);

    return (
        <>
            <DefaultLayout background="board">
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
                        <div className={styles.sectionWrapper}>
                            <div className={styles.section}>
                                <div className={styles.sectionTitle}>이미지</div>
                                <ProductImageUpload
                                    images={imageUpload.images}
                                    inputRef={imageUpload.inputRef}
                                    containerRef={imageUpload.containerRef}
                                    handleFileSelect={imageUpload.handleFileSelect}
                                    handleDropFiles={imageUpload.handleDropFiles}
                                    handleRemove={imageUpload.handleRemove}
                                />
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
                        <div className={styles.uploadButtonWrapper}>
                            <UploadButton disabled={valid !== null} onClick={handleSubmit}>
                                업로드
                            </UploadButton>
                        </div>
                    </div>
                </div>
            </DefaultLayout>
        </>
    );
}