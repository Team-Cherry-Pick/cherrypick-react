import { createSafeContext } from '../utils/create-safe-context';
import { OverlayData } from './reducer';

export function createOverlaySafeContext() {
    const [OverlayContextProvider, useOverlayContext] = createSafeContext<OverlayData>('overlay/OverlayContext');

    function useCurrentOverlay() {
        return useOverlayContext().current;
    }

    function useOverlayData() {
        return useOverlayContext().overlayData;
    }

    return { OverlayContextProvider, useCurrentOverlay, useOverlayData };
}
