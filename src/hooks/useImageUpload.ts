import { useEffect, useRef, useState } from 'react';
import Sortable from 'sortablejs';
import { useSetAtom } from 'jotai';
import { imageFilesAtom } from '@/store/deals';

export const MAX_IMAGES = 5;

export const useImageUpload = () => {
    const [images, setImages] = useState<File[]>([]);
    const setImageFiles = useSetAtom(imageFilesAtom);

    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const sortableRef = useRef<Sortable | null>(null);

    useEffect(() => {
        setImageFiles(images);
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
        if (images.length + fileArray.length > MAX_IMAGES) {
            alert(`이미지는 최대 ${MAX_IMAGES}장까지 등록할 수 있어요.`);
            return;
        }
        setImages(prev => [...prev, ...fileArray]);
    };

    const handleDropFiles = (files: FileList) => {
        const fileArray = Array.from(files);
        if (images.length + fileArray.length > MAX_IMAGES) {
            alert(`이미지는 최대 ${MAX_IMAGES}장까지 등록할 수 있어요.`);
            return;
        }
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
