import { useMemo } from 'react';
import type { DealImage } from '@/types/Deal';

/**
 * Hook for managing carousel images
 * Returns the original images from the server
 */
export const useCarouselImages = (imageUrls: DealImage[]) => {
    return useMemo(() => {
        return imageUrls || [];
    }, [imageUrls]);
};
