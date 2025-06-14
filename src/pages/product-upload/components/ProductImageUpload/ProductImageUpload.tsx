import { X } from 'lucide-react';
import styles from './ProductImageUpload.module.css';
import { MAX_IMAGES, useImageUpload } from '@/hooks/useImageUpload';
import UploadIcon from '@/assets/icons/upload-image-Icon.svg';

export function ProductImageUpload() {
    const { images, inputRef, containerRef, handleFileSelect, handleDropFiles, handleRemove } = useImageUpload();

    const handleClick = () => {
        if (images.length >= MAX_IMAGES) {
            alert(`이미지는 최대 ${MAX_IMAGES}장까지 등록할 수 있어요.`);
            return;
        }
        inputRef.current?.click();
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => e.preventDefault();

    return (
        <div className={styles.productImageUploadWrapper}>
            <div className={styles.previewWrapper} ref={containerRef}>
                {images.map((file, index) => (
                    <div key={`${file.name}-${file.lastModified}`} className={styles.thumbnailWrapper}>
                        {index === 0 && <div className={styles.representativeBadge}>대표사진</div>}
                        <img className={styles.thumbnail} src={URL.createObjectURL(file)} alt={`img-${index}`} />
                        <button
                            className={styles.deleteButton}
                            onClick={e => {
                                e.stopPropagation();
                                handleRemove(index);
                            }}
                        >
                            <X size={12} />
                        </button>
                    </div>
                ))}
            </div>
            <div
                className={styles.uploadBox}
                onClick={handleClick}
                onDrop={e => {
                    e.preventDefault();
                    handleDropFiles(e.dataTransfer.files);
                }}
                onDragOver={handleDragOver}
            >
                <input
                    className={styles.hiddenInput}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={e => handleFileSelect(e.target.files)}
                    ref={inputRef}
                />
                <div className={styles.content}>
                    <img className={styles.icon} src={UploadIcon} alt="Upload Icon" />
                    <div className={styles.guideText}>
                        {images.length === 0 ? '클릭 또는 파일을 드래그해주세요.' : '추가 업로드'}
                    </div>
                </div>
                <div className={styles.imageCount}>
                    {images.length} / {MAX_IMAGES}
                </div>
            </div>
        </div>
    );
}
