import * as S from './ImageUpload.style';
import { useImageUpload, MAX_IMAGES } from '@/hooks/useImageUpload';
import { X } from 'lucide-react';
import UploadIcon from '@/assets/icons/upload-image-Icon.svg';

const ProductImageUpload = () => {
    const {
        images,
        inputRef,
        containerRef,
        handleFileSelect,
        handleDropFiles,
        handleRemove,
    } = useImageUpload();

    const handleClick = () => {
        if (images.length >= MAX_IMAGES) {
            alert(`이미지는 최대 ${MAX_IMAGES}장까지 등록할 수 있어요.`);
            return;
        }
        inputRef.current?.click();
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => e.preventDefault();

    return (
        <S.SectionWrapper>
            <S.SectionTitle>이미지</S.SectionTitle>
            <S.SectionContainer>
                <S.PreviewWrapper ref={containerRef}>
                    {images.map((file, index) => (
                        <S.ThumbnailWrapper key={`${file.name}-${file.lastModified}`}>
                            {index === 0 && <S.RepresentativeBadge>대표사진</S.RepresentativeBadge>}
                            <S.Thumbnail src={URL.createObjectURL(file)} alt={`img-${index}`} />
                            <S.DeleteButton onClick={(e) => {
                                e.stopPropagation();
                                handleRemove(index);
                            }}>
                                <X size={12} />
                            </S.DeleteButton>
                        </S.ThumbnailWrapper>
                    ))}
                </S.PreviewWrapper>
                <S.UploadBox onClick={handleClick} onDrop={(e) => {
                    e.preventDefault();
                    handleDropFiles(e.dataTransfer.files);
                }} onDragOver={handleDragOver}>
                    <S.HiddenInput
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) => handleFileSelect(e.target.files)}
                        ref={inputRef}
                    />
                    {images.length === 0 ? (
                        <S.Content>
                            <S.Icon src={UploadIcon} alt="Upload Icon" />
                            <S.GuideText>클릭 또는 파일을 드래그해주세요.</S.GuideText>
                        </S.Content>
                    ) : (
                        <>
                            <S.Icon src={UploadIcon} alt="Upload Icon" />
                            <S.GuideText>추가 업로드</S.GuideText>
                        </>
                    )}
                    <S.ImageCount>{images.length} / {MAX_IMAGES}</S.ImageCount>
                </S.UploadBox>
            </S.SectionContainer>
        </S.SectionWrapper>
    );
};

export default ProductImageUpload;
