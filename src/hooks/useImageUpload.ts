import { useEffect, useRef, useState } from 'react';
import Sortable from 'sortablejs';
import { useSetAtom } from 'jotai';
import { imageFilesAtom } from '@/store/deals';

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
    const [images, setImages] = useState<File[]>([]);
    const setImageFiles = useSetAtom(imageFilesAtom);

    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const sortableRef = useRef<Sortable | null>(null);

    useEffect(() => {
        setImageFiles({
            images: images,
            indexes: images.map((_, index) => index),
        });
    }, [images, setImageFiles]);

    useEffect(() => {
        if (!containerRef.current || images.length === 0) return;

        if (sortableRef.current) {
            sortableRef.current.destroy();
        }

        sortableRef.current = Sortable.create(containerRef.current, {
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
            sortableRef.current = null;
        };
    }, [images.length]);

    const handleFileSelect = (files: FileList | null) => {
        if (!files) return;
        const fileArray = Array.from(files);
        if (!validateImages(images.length, fileArray)) return;
        setImages(prev => [...prev, ...fileArray]);
    };

    const handleDropFiles = (files: FileList) => {
        const fileArray = Array.from(files);
        if (!validateImages(images.length, fileArray)) return;
        setImages(prev => [...prev, ...fileArray]);
    };

    const handleRemove = (index: number) => {
        setImages(prev => prev.filter((_, i) => i !== index));
    };

    return {
        images,
        inputRef,
        containerRef,
        handleFileSelect,
        handleDropFiles,
        handleRemove,
    };
};
