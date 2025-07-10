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
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import type { DealImage, DetailedDeal } from '@/types/Deal';

// URL을 File 객체로 변환하는 함수
const urlToFile = async (url: string, filename: string): Promise<File> => {
    const response = await fetch(url);
    const blob = await response.blob();
    return new File([blob], filename, { type: blob.type });
};

// (예시) 딜 상세 정보 fetch 함수
const fetchDealDetail = async (dealId: string): Promise<DetailedDeal> => {
    // 실제 API 호출로 교체 필요
    const res = await fetch(`/api/deal/${dealId}`);
    if (!res.ok) throw new Error('딜 정보를 불러오지 못했습니다.');
    return res.json();
};

export default function ProductUploadPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { dealId } = useParams();
    const [deal, setDeal] = useAtom(newDealAtom);
    const [images, setImages] = useAtom(imageFilesAtom);

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

        uploadDeal(uploadDealData).then(() => {
            navigate('/');
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

    // 등록/수정 모드 분기: dealId가 있으면 수정 모드, 없으면 등록 모드
    useEffect(() => {
        const init = async () => {
            if (dealId) {
                // 수정 모드: dealId로 데이터 fetch 후 상태 세팅
                try {
                    const d = await fetchDealDetail(dealId);
                    setDeal({
                        title: d.title,
                        categoryId: d.categorys && d.categorys.length > 0 ? Number(d.categorys[0]) : undefined, // categorys[0]을 categoryId로 사용(실제 값에 맞게 변환 필요)
                        imageIds: d.imageUrls ? d.imageUrls.map((img: DealImage) => img.imageId) : [],
                        originalUrl: d.originalUrl,
                        storeId: undefined, // DetailedDeal에는 storeId가 없음. 필요시 별도 매핑 필요
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
                        content: d.content,
                        discountIds: [], // DetailedDeal에는 없음
                        discountNames: [], // DetailedDeal에는 없음
                        discountDescription: '', // DetailedDeal에는 없음
                    });

                    // 기존 이미지들을 imageFilesAtom에 설정
                    if (d.imageUrls && d.imageUrls.length > 0) {
                        const imageFiles = await Promise.all(
                            d.imageUrls.map(async (img: DealImage, index: number) => {
                                const file = await urlToFile(img.url, `image_${index}.jpg`);
                                return file;
                            })
                        );
                        setImages({
                            images: imageFiles,
                            indexes: d.imageUrls.map((img: DealImage) => img.indexes)
                        });
                    }
                } catch {
                    alert('핫딜 정보를 불러오지 못했습니다.');
                }
            } else if (location.state?.deal) {
                // 기존 location.state로 진입하는 경우도 지원
                const d = location.state.deal;
                setDeal({
                    title: d.title,
                    categoryId: d.categoryId,
                    imageIds: d.imageUrls ? d.imageUrls.map((img: DealImage) => img.imageId) : [],
                    originalUrl: d.originalUrl,
                    storeId: d.storeId,
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
                    content: d.content,
                    discountIds: d.discountIds || [],
                    discountNames: d.discountNames || [],
                    discountDescription: d.discountDescription || '',
                });
                if (d.imageUrls && d.imageUrls.length > 0) {
                    const imageFiles = await Promise.all(
                        d.imageUrls.map(async (img: DealImage, index: number) => {
                            const file = await urlToFile(img.url, `image_${index}.jpg`);
                            return file;
                        })
                    );
                    setImages({
                        images: imageFiles,
                        indexes: d.imageUrls.map((img: DealImage) => img.indexes)
                    });
                }
            }
        };
        init();
    }, [dealId, location.state, setDeal, setImages]);

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
