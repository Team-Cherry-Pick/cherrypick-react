import { useState } from 'react';
import DefaultLayout from '@/components/layout/DefaultLayout';
import { useTheme } from 'styled-components';
import { TextArea, TextInput, SelectTrigger } from '@/components/common/Input';
import ProductImageUpload from './ProductImageUpload';
import { ModalLayout } from '@/components/common/Modal/layout/ModalLayout';
import { ModalOverlay, ModalContainer } from '@/components/common/Modal/layout/modal.style';
import * as S from './ProductUploadPage.style';
import BadgeLabel from '@/components/common/Badge/BadgeLabel';

const PRICE_BADGES = ['다양한가격', '$'];
const SHIPPING_BADGES = ['무료배송', '조건 무료배송', '유료 배송'];

const ProductUploadPage = () => {
    const theme = useTheme();
    const [modalType, setModalType] = useState<'category' | 'store' | 'discount' | null>(null);
    const [detailText, setDetailText] = useState('');
    const [discountText, setDiscountText] = useState('');
    const [selectedPriceBadge, setSelectedPriceBadge] = useState<string | null>(null);
    const [selectedShippingBadge, setSelectedShippingBadge] = useState<string | null>(null);

    const handleDetailChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDetailText(e.target.value);
    };

    const handleDiscountChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDiscountText(e.target.value);
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
                            <S.SectionContainer style={{ padding: `0 ${theme.spacing[10]}` }}>
                                <S.SectionTitle>이미지</S.SectionTitle>
                                <ProductImageUpload />
                            </S.SectionContainer>

                            <S.SectionDivider />

                            <S.SectionWrapper>
                                <S.SectionContainer>
                                    <S.SectionTitle>상품 정보</S.SectionTitle>
                                    <TextInput placeholder="상품명 입력" />
                                    <SelectTrigger label="카테고리 선택" onClick={() => setModalType('category')} />
                                </S.SectionContainer>
                                <S.SectionContainer>
                                    <S.SectionTitle>링크 정보</S.SectionTitle>
                                    <TextInput placeholder="상품 URL 입력" />
                                    <SelectTrigger label="스토어 선택" onClick={() => setModalType('store')} />
                                </S.SectionContainer>
                            </S.SectionWrapper>

                            <S.SectionDivider />

                            <S.SectionWrapper>
                                <S.SectionContainer>
                                    <S.SectionTitle>가격 정보</S.SectionTitle>
                                    <S.BadgeBox>
                                        {PRICE_BADGES.map((label) => (
                                            <BadgeLabel
                                                key={label}
                                                label={label}
                                                selected={selectedPriceBadge === label}
                                                onClick={() =>
                                                    setSelectedPriceBadge(
                                                        selectedPriceBadge === label ? null : label
                                                    )
                                                }
                                            />
                                        ))}
                                    </S.BadgeBox>
                                    <S.TextBox>
                                        <TextInput placeholder="세일가" />
                                        <TextInput placeholder="정가" />
                                    </S.TextBox>
                                </S.SectionContainer>
                                <S.SectionContainer>
                                    <S.SectionTitle>배송 정보</S.SectionTitle>
                                    <S.BadgeBox>
                                        {SHIPPING_BADGES.map((label) => (
                                            <BadgeLabel
                                                key={label}
                                                label={label}
                                                selected={selectedShippingBadge === label}
                                                onClick={() =>
                                                    setSelectedShippingBadge(
                                                        selectedShippingBadge === label ? null : label
                                                    )
                                                }
                                            />
                                        ))}
                                    </S.BadgeBox>
                                    <S.TextBox>
                                        <TextInput placeholder="무료배송 조건" />
                                        <TextInput placeholder="배송비" />
                                    </S.TextBox>
                                </S.SectionContainer>
                            </S.SectionWrapper>

                            <S.SectionDivider />

                            <S.SectionWrapper>
                                <S.SectionContainer>
                                    <S.SectionTitle>상세 정보</S.SectionTitle>
                                    <S.TextAreaWrapper>
                                        <TextArea
                                            placeholder="상품 설명을 입력하세요."
                                            value={detailText}
                                            onChange={handleDetailChange}
                                        />
                                        <S.CharCount>{detailText.length} / 800</S.CharCount>
                                    </S.TextAreaWrapper>
                                </S.SectionContainer>
                                <S.SectionContainer>
                                    <S.SectionTitle>할인 정보 (선택)</S.SectionTitle>
                                    <SelectTrigger
                                        label="할인방식 선택"
                                        onClick={() => setModalType('discount')}
                                    />
                                    <S.TextAreaWrapper>
                                        <TextArea
                                            placeholder="최저가로 구매하기 위한 방법을 작성해주세요."
                                            value={discountText}
                                            onChange={handleDiscountChange}
                                        />
                                        <S.CharCount>{discountText.length} / 800</S.CharCount>
                                    </S.TextAreaWrapper>
                                </S.SectionContainer>
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
