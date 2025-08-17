import { useRef, useState } from 'react';
import { uploadImage } from '@/services/apiImage';
import { Image } from '@/types/Image';

export const MAX_IMAGES = 5;
export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

function validateImages(currentLength: number, files: File[]) {
    if (files.some(file => file.size > MAX_FILE_SIZE)) {
        alert('제한된 크기(10MB)를 초과하여 업로드되지 않았습니다.');
        return false;
    }
    if (currentLength + files.length > MAX_IMAGES) {
        alert(`이미지는 최대 ${MAX_IMAGES}장까지 등록할 수 있어요.`);
        return false;
    }
    return true;
}

export const useImageUpload = () => {
    const [images, setImages] = useState<Image[]>([]);

    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = async (files: FileList | null) => {
        if (!files) return;
        const fileArray = Array.from(files);
        if (!validateImages(images.length, fileArray)) return;
        try {
            const uploaded = await uploadImage({ images: fileArray, indexes: fileArray.map((_, i) => i) });
            setImages(prev => [...prev, ...uploaded]);
        } catch (e: any) {
            alert(e.message || '이미지 업로드에 실패했습니다.');
        }
    };

    const handleDropFiles = async (files: FileList) => {
        const fileArray = Array.from(files);
        if (!validateImages(images.length, fileArray)) return;
        try {
            const uploaded = await uploadImage({ images: fileArray, indexes: fileArray.map((_, i) => i) });
            setImages(prev => [...prev, ...uploaded]);
        } catch (e: any) {
            alert(e.message || '이미지 업로드에 실패했습니다.');
        }
    };

    const handleRemove = (index: number) => {
        setImages(prev => prev.filter((_, i) => i !== index));
    };

    return {
        images,
        setImages,
        inputRef,
        containerRef,
        handleFileSelect,
        handleDropFiles,
        handleRemove,
    };
};
