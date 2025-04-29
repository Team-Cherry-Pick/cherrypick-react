import { useEffect, useRef, useState } from 'react';
import Sortable from 'sortablejs';
import * as S from './ProductImageUpload.style';
import { FaTrashCan } from "react-icons/fa6";
import UploadIcon from '@/assets/icons/upload-image-Icon.svg';

const MAX_IMAGES = 4;

const ProductImageUpload = () => {
    const [images, setImages] = useState<File[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const sortableRef = useRef<Sortable | null>(null);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        sortableRef.current = Sortable.create(el, {
            animation: 150,
            onEnd: ({ oldIndex, newIndex }) => {
                if (oldIndex == null || newIndex == null) return;

                setImages(prev => {
                    const updated = [...prev];
                    const [moved] = updated.splice(oldIndex, 1);
                    updated.splice(newIndex, 0, moved);
                    return updated;
                });
            },
        });

        return () => {
            sortableRef.current?.destroy();
        };
    }, []);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;
        const fileArray = Array.from(files).slice(0, MAX_IMAGES - images.length);
        if (images.length + fileArray.length > MAX_IMAGES) {
            alert(`이미지는 최대 ${MAX_IMAGES}장까지 등록할 수 있어요.`);
            return;
        }
        setImages(prev => [...prev, ...fileArray]);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        if (!files) return;
        const fileArray = Array.from(files).slice(0, MAX_IMAGES - images.length);
        if (images.length + fileArray.length > MAX_IMAGES) {
            alert(`이미지는 최대 ${MAX_IMAGES}장까지 등록할 수 있어요.`);
            return;
        }
        setImages(prev => [...prev, ...fileArray]);
    };

    const handleClick = () => {
        if (images.length >= MAX_IMAGES) {
            alert(`이미지는 최대 ${MAX_IMAGES}장까지 등록할 수 있어요.`);
            return;
        }
        inputRef.current?.click();
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleRemove = (index: number) => {
        setImages(prev => prev.filter((_, i) => i !== index));
    };

    return (
        <S.Wrapper onClick={handleClick} onDrop={handleDrop} onDragOver={handleDragOver}>
            <S.HiddenInput
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileSelect}
                ref={inputRef}
            />
            {images.length === 0 ? (
                <S.Content>
                    <S.Icon src={UploadIcon} alt="Upload Icon" />
                    <S.GuideText>클릭 또는 파일을 드래그해주세요.</S.GuideText>
                </S.Content>
            ) : (
                <S.PreviewWrapper ref={containerRef}>
                    {images.map((file, index) => (
                        <S.ThumbnailWrapper key={`${file.name}-${file.lastModified}`}>
                            <S.OrderBadge>{index + 1}</S.OrderBadge>
                            <S.Thumbnail src={URL.createObjectURL(file)} alt={`img-${index}`} />
                            <S.DeleteButton onClick={(e) => {
                                e.stopPropagation();
                                handleRemove(index);
                            }}>
                                <FaTrashCan size={15} />
                            </S.DeleteButton>
                        </S.ThumbnailWrapper>
                    ))}
                </S.PreviewWrapper>
            )}
            <S.ImageCount>{images.length} / {MAX_IMAGES}</S.ImageCount>
        </S.Wrapper>
    );
};

export default ProductImageUpload;

