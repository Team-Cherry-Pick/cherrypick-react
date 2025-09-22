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
import { fetchDetailedDeal, uploadDeal, updateDeal, getProductInfoForRepik, getCategorySuggestionForRepik } from '@/services/apiDeal';
import { GA4Events } from '@/utils/ga4';
import { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { CategorySuggestion, UpdateDeal } from '@/types/Deal';
import { useImageUpload } from '@/hooks/useImageUpload';
import { selectedDiscountAtom } from '@/store/search';
import { uploadSelectedCategoryAtom } from '@/store/category';
import { overlay } from '@/context/overlay';
import { ProgressModal } from '@/components/common/ProgressModal/ProgressModal';
import useIsMobileViewport from '@/hooks/useIsMobileViewport';
import aiIcon from '@/assets/icons/ai-Icon.svg';
import aiActiveIcon from '@/assets/icons/ai-active-Icon.svg';

export default function ProductUploadPage() {
    const navigate = useNavigate();
    const { dealId } = useParams();
    const isMobile = useIsMobileViewport();

    const [deal, setDeal] = useAtom(newDealAtom);
    const [aiActive, setAiActive] = useState(false);
    const [animationClass, setAnimationClass] = useState('');
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

    const prevAiActive = useRef(aiActive);

    useEffect(() => {
        if (prevAiActive.current === aiActive) return;
        if (aiActive) {
            setAnimationClass(styles.aiToggleContentFadeIn);
        } else {
            setAnimationClass(styles.aiToggleContentFadeOut);
        }
        prevAiActive.current = aiActive;
    }, [aiActive]);

    const handleAiToggle = () => {
        setAiActive(prev => !prev);
    };

    // 모든 업로드 관련 상태 초기화 함수
    const resetAllUploadStates = () => {
        // newDealAtom 초기화
        setDeal({
            title: '',
            categoryId: undefined,
            imageIds: [],
            originalUrl: '',
            storeId: undefined,
            storeName: '',
            price: {
                priceType: 'KRW',
                regularPrice: 0,
                discountedPrice: 0,
            },
            shipping: {
                shippingType: 'FREE',
                shippingPrice: 0,
                shippingRule: '',
            },
            content: '',
            discountIds: [],
            discountNames: [],
        });

        // 카테고리 선택 초기화
        setUploadSelectedCategory(null);

        // 할인 정보 초기화
        setSelectedDiscount([]);

        // 이미지 초기화
        imageUpload.setImages([]);

        // AI 상태 초기화
        setAiActive(false);
        setAnimationClass('');
    };

    // 공통 데이터 처리 함수 (수정 모드와 AI 기능에서 공통 사용)
    const populateFormWithData = (data: any) => {
        setDeal(prevDeal => ({
            ...prevDeal, // 기존 값 유지
            title: data.title || '',
            categoryId: data.categoryId || undefined,
            imageIds: data.imageUrls ? data.imageUrls.map((img: any) => img.imageId || img.id) : [],
            originalUrl: data.originalUrl || '',
            storeId: data.storeId || data.store?.storeId,
            storeName: data.store?.storeName || data.storeName || '',
            price: {
                priceType: data.price.priceType,
                regularPrice: data.price.regularPrice,
                discountedPrice: data.price.discountedPrice,
            },
            shipping: {
                shippingType: data.shipping.shippingType,
                shippingPrice: data.shipping.shippingPrice || 0,
                shippingRule: data.shipping.shippingRule || '',
            },
            content: data.content || '',
            // 할인정보: 데이터에 있으면 사용, 없으면 기존 값 유지
            discountIds: data.discountIds !== undefined ? data.discountIds : prevDeal.discountIds,
            discountNames: data.discountName && data.discountName !== null ?
                data.discountName.split(',').map((name: string) => name.trim()) :
                prevDeal.discountNames,
        }));

        // 이미지 설정 (API 응답 구조에 따라 다르게 처리)
        if (data.imageUrls && data.imageUrls.length > 0) {
            imageUpload.setImages(
                data.imageUrls.map((img: any) => ({
                    imageId: img.imageId || img.id,
                    imageUrl: img.url,
                    indexes: img.indexes || img.index,
                }))
            );
        }
    };

    // AI 기능으로 URL에서 상품 정보 자동 추출
    const handleAiFetchProductInfo = async (url: string) => {
        if (!aiActive || !url.trim()) return;

        // 프로그레스 모달 열기 - 상품 정보 분석 메시지
        const progressModalId = overlay.open(props =>
            <ProgressModal {...props} message="상품 정보를 AI로 분석하고 있습니다.." />
        );

        try {
            const productInfo = await getProductInfoForRepik(url);
            // 기존 수정 로직과 동일한 방식으로 처리
            populateFormWithData(productInfo);

            // 상품 정보에서 title이 있으면 카테고리 추천도 자동 실행
            if (productInfo.title && productInfo.title.trim()) {
                const suggestion: CategorySuggestion = await getCategorySuggestionForRepik(productInfo.title);
                if (suggestion.categorys && suggestion.categorys.length > 0) {
                    // 텍스트 표시용 상태 업데이트
                    setUploadSelectedCategory({
                        categoryId: suggestion.categoryId,
                        path: suggestion.categorys,
                    });
                    
                    // 실제 업로드 데이터의 categoryId도 함께 업데이트
                    setDeal(prev => ({
                        ...prev,
                        categoryId: suggestion.categoryId
                    }));
                }
            } else {
                overlay.close(progressModalId);
            }
        } catch (error) {
            console.error('AI 상품 정보 추출 실패:', error);
            alert('상품 정보를 가져오는데 실패했습니다. URL을 다시 확인해주세요.');
        } finally {
            overlay.close(progressModalId);
        }
    };

    // AI 기능으로 제목에서 카테고리 자동 추천
    const handleAiCategorySuggestion = async (title: string) => {
        if (!aiActive || !title.trim()) return;

        const progressModalId = overlay.open(props =>
            <ProgressModal {...props} message="상품 정보를 AI로 분석하고 있습니다.." />
        );

        try {
            const suggestion: CategorySuggestion = await getCategorySuggestionForRepik(title);

            if (suggestion.categorys && suggestion.categorys.length > 0) {
                // 텍스트 표시용 상태 업데이트
                setUploadSelectedCategory({
                    categoryId: suggestion.categoryId,
                    path: suggestion.categorys,
                });
                
                // 실제 업로드 데이터의 categoryId도 함께 업데이트
                setDeal(prev => ({
                    ...prev,
                    categoryId: suggestion.categoryId
                }));
            }
        } catch (error) {
            console.error('AI 카테고리 추천 실패:', error);
            alert('상품 정보를 가져오는데 실패했습니다. 상품명을 다시 확인해주세요.');
        } finally {
            overlay.close(progressModalId);
        }
    };

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
                // 수정 완료 후 상태 초기화 (다른 업로드를 위해)
                resetAllUploadStates();
                navigate(`/product/${dealId}`);
                window.location.reload();
            });
        } else {
            // 새 게시글 모드: uploadDeal 사용
            uploadDeal(uploadDealData).then(() => {
                GA4Events.uploadDeal(deal.categoryId, deal.storeId);
                // 업로드 성공 후 모든 상태 초기화
                resetAllUploadStates();
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
            if (dealId) {
                // 수정 모드: 기존 데이터 로드
                try {
                    const d = await fetchDetailedDeal(dealId);

                    // 공통 함수로 폼 데이터 설정
                    populateFormWithData(d);

                    // 카테고리 정보를 uploadSelectedCategoryAtom에 설정
                    if (d.categoryId && d.categorys && d.categorys.length > 0) {
                        setUploadSelectedCategory({
                            categoryId: d.categoryId,
                            path: d.categorys,
                        });
                    }
                } catch (error) {
                    console.error('핫딜 정보를 불러오는데 실패:', error);
                    alert('핫딜 정보를 불러오지 못했습니다.');
                }
            } else {
                // 새 업로드 모드: 모든 상태 초기화
                resetAllUploadStates();
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
                        {isMobile ? (
                            <>
                                <div className={styles.sectionWrapper}>
                                    <div className={styles.section}>
                                        <div className={styles.sectionTitleWithToggle}>
                                            <div className={styles.sectionTitle}>링크 정보</div>
                                            <div className={styles.aiToggleWrapper}>
                                                <button
                                                    className={`${styles.aiToggleButton} ${aiActive && styles.aiToggleButton_active}`}
                                                    onClick={handleAiToggle}
                                                >
                                                    <div className={styles.aiToggleButton__gradient} />
                                                    <div className={`${styles.aiToggleIconWrapper} ${aiActive && styles.aiToggleIconWrapper_active}`}>
                                                        <img src={aiIcon} />
                                                        <img className={styles.aiIcon_active} src={aiActiveIcon} />
                                                    </div>
                                                    <div className={`${styles.aiToggleContent} ${animationClass}`}>AI 작성 </div>
                                                </button>
                                            </div>
                                        </div>
                                        <LinkInfo
                                            aiActive={aiActive}
                                            onAiFetchProductInfo={handleAiFetchProductInfo}
                                        />
                                    </div>
                                </div>
                                <div className={styles.sectionDivider} />
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
                                    <div className={styles.section}>
                                        <div className={styles.sectionTitle}>상품 정보</div>
                                        <ProductInfo onAiCategorySuggestion={handleAiCategorySuggestion} />
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
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
                                        <div className={styles.sectionTitleWithToggle}>
                                            <div className={styles.sectionTitle}>링크 정보</div>
                                            <div className={styles.aiToggleWrapper}>
                                                <button
                                                    className={`${styles.aiToggleButton} ${aiActive && styles.aiToggleButton_active}`}
                                                    onClick={handleAiToggle}
                                                >
                                                    <div className={styles.aiToggleButton__gradient} />
                                                    <div className={`${styles.aiToggleIconWrapper} ${aiActive && styles.aiToggleIconWrapper_active}`}>
                                                        <img src={aiIcon} />
                                                        <img className={styles.aiIcon_active} src={aiActiveIcon} />
                                                    </div>
                                                    <div className={`${styles.aiToggleContent} ${animationClass}`}>AI 작성</div>
                                                </button>
                                            </div>
                                        </div>
                                        <LinkInfo
                                            aiActive={aiActive}
                                            onAiFetchProductInfo={handleAiFetchProductInfo}
                                        />
                                    </div>
                                    <div className={styles.section}>
                                        <div className={styles.sectionTitle}>상품 정보</div>
                                        <ProductInfo onAiCategorySuggestion={handleAiCategorySuggestion} />
                                    </div>
                                </div>
                            </>
                        )}
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