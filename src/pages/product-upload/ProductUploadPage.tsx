import DefaultLayout from '@/components/layout/DefaultLayout';
import { useTheme } from 'styled-components';
import { TextArea, TextInput, SelectTrigger } from '@/components/common/Input';
import ProductImageUpload from './ProductImageUpload';
import * as S from './ProductUploadPage.style';

const ProductUploadPage = () => {
    const theme = useTheme();

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
                                    <SelectTrigger label="카테고리 선택" />
                                </S.SectionContainer>
                                <S.SectionContainer>
                                    <S.SectionTitle>링크 정보</S.SectionTitle>
                                    <TextInput placeholder="상품 URL 입력" />
                                    <SelectTrigger label="스토어 선택" />
                                </S.SectionContainer>
                            </S.SectionWrapper>

                            <S.SectionDivider />

                            <S.SectionWrapper>
                                <S.SectionContainer>
                                    <S.SectionTitle>가격 정보</S.SectionTitle>
                                    <S.TextBox>
                                        <TextInput placeholder="세일가" />
                                        <TextInput placeholder="정가" />
                                    </S.TextBox>
                                </S.SectionContainer>
                                <S.SectionContainer>
                                    <S.SectionTitle>배송 정보</S.SectionTitle>
                                    <S.TextBox>
                                        <TextInput placeholder="세일가" />
                                        <TextInput placeholder="정가" />
                                    </S.TextBox>
                                </S.SectionContainer>
                            </S.SectionWrapper>

                            <S.SectionDivider />

                            <S.SectionWrapper>
                                <S.SectionContainer>
                                    <S.SectionTitle>상세 정보</S.SectionTitle>
                                    <TextArea placeholder="상품 설명을 입력하세요" />
                                </S.SectionContainer>
                                <S.SectionContainer>
                                    <S.SectionTitle>할인 정보 (선택)</S.SectionTitle>
                                    <SelectTrigger label="할인방식 선택" />
                                    <TextArea placeholder="최저가로 구매하기 위한 방법을 작성해주세요." />
                                </S.SectionContainer>
                            </S.SectionWrapper>
                        </S.ContentWrapper>
                    </S.Inner>
                </S.Main>
            </DefaultLayout>
        </>
    );
};

export default ProductUploadPage;
