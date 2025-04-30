import { useState } from 'react';
import DefaultLayout from '@/components/layout/DefaultLayout';
import { useTheme } from 'styled-components';

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
    const theme = useTheme();
    const [modalType, setModalType] = useState<'category' | 'store' | 'discount' | null>(null);

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

                            <S.SectionWrapper style={{ padding: `0 ${theme.spacing[10]}` }}>
                                <ProductImageUpload />
                            </S.SectionWrapper>

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
