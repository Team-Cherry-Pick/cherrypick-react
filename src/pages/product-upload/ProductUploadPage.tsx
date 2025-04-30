import { useState } from 'react';
import DefaultLayout from '@/components/layout/DefaultLayout';
import { useAtom } from 'jotai';
import { newDealAtom, imageFilesAtom } from '@/store/deals';

import UploadButton from '@/components/common/Button/UploadButton';
import ProductImageUpload from '@/components/upload/ImageUpload';
import ProductInfoSection from '@/components/upload/ProductInfoSection';
import LinkInfoSection from '@/components/upload/LinkInfoSection';
import PriceInfoSection from '@/components/upload/PriceInfoSection';
import ShippingInfoSection from '@/components/upload/ShippingInfoSection';
import DetailSection from '@/components/upload/DetailSection';
import DiscountSection from '@/components/upload/DiscountSection';

import { ModalLayout } from '@/components/common/Modal/layout/ModalLayout';
import { ModalOverlay, ModalContainer } from '@/components/common/Modal/layout/modal.style';

import * as S from './ProductUploadPage.style';

const ProductUploadPage = () => {
    const [modalType, setModalType] = useState<'category' | 'store' | 'discount' | null>(null);

    const [deal] = useAtom(newDealAtom);
    const [images] = useAtom(imageFilesAtom);

    const isFormValid =
        images.length > 0 &&
        deal.title.trim() !== '' &&
        deal.categoryId !== null &&
        deal.storeId !== null &&
        deal.originalUrl.trim() !== '' &&
        deal.price.discountedPrice > 0 &&
        deal.price.regularPrice > 0 &&
        deal.shipping.shippingType !== null;

    const handleSubmit = () => {
        console.log('📦 업로드할 deal 데이터:', deal);
        alert('deal 데이터가 콘솔에 출력되었습니다.');
    };

    return (
        <>
            <S.TopBackground />
            <S.TopContent>
                <S.Title>
                    <S.Light>쇼핑몰에서 찾은 </S.Light>
                    <S.Bold>저렴한 할인상품</S.Bold>
                    <S.Light>을 공유하세요!</S.Light>
                </S.Title>
                <S.Description>
                    게시물 양식에 대한 내용을 최대한 자세하게 작성해주세요.<br />
                    다른 사람들이 사용자님의 핫딜을 구매할 가능성을 높일 수 있어요.
                </S.Description>
                <S.GuideButtonWrapper>
                    <S.GuideButton>
                        작성 유의사항 및 가이드
                        <S.ArrowIcon />
                    </S.GuideButton>
                </S.GuideButtonWrapper>
            </S.TopContent>

            <DefaultLayout background="board">
                <S.Main>
                    <S.Inner>
                        <S.ContentWrapper>

                            <S.ImageUploadWrapper>
                                <S.UploadButtonWrapper>
                                    <UploadButton disabled={!isFormValid} onClick={handleSubmit}>
                                        업로드
                                    </UploadButton>
                                </S.UploadButtonWrapper>

                                <S.ImageUploadBox>
                                    <ProductImageUpload />
                                </S.ImageUploadBox>
                            </S.ImageUploadWrapper>
                            <S.SectionDivider />

                            <S.SectionWrapper>
                                <ProductInfoSection onOpenCategoryModal={() => setModalType('category')} />
                                <LinkInfoSection onOpenStoreModal={() => setModalType('store')} />
                            </S.SectionWrapper>

                            <S.SectionDivider />

                            <S.SectionWrapper>
                                <PriceInfoSection />
                                <ShippingInfoSection />
                            </S.SectionWrapper>

                            <S.SectionDivider />

                            <S.SectionWrapper>
                                <DetailSection />
                                <DiscountSection onOpenDiscountModal={() => setModalType('discount')} />
                            </S.SectionWrapper>

                        </S.ContentWrapper>
                    </S.Inner>
                </S.Main>
            </DefaultLayout>

            {modalType === 'category' && (
                <ModalOverlay onClick={() => setModalType(null)}>
                    <ModalContainer onClick={(e) => e.stopPropagation()}>
                        <ModalLayout title="카테고리 선택" onClose={() => setModalType(null)} />
                    </ModalContainer>
                </ModalOverlay>
            )}

            {modalType === 'store' && (
                <ModalOverlay onClick={() => setModalType(null)}>
                    <ModalContainer onClick={(e) => e.stopPropagation()}>
                        <ModalLayout title="스토어 선택" onClose={() => setModalType(null)} />
                    </ModalContainer>
                </ModalOverlay>
            )}

            {modalType === 'discount' && (
                <ModalOverlay onClick={() => setModalType(null)}>
                    <ModalContainer onClick={(e) => e.stopPropagation()}>
                        <ModalLayout title="할인방식 선택" onClose={() => setModalType(null)} />
                    </ModalContainer>
                </ModalOverlay>
            )}
        </>
    );
};

export default ProductUploadPage;
