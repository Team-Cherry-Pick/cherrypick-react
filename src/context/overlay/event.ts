import { randomId } from '@/context/overlay/utils';
import { OverlayControllerComponent } from './context/provider/content-overlay-controller';
import { createUseExternalEvents } from './utils';

export type OverlayEvent = {
    open: (args: { controller: OverlayControllerComponent; overlayId: string; componentKey: string }) => void;
    close: (overlayId: string) => void;
    unmount: (overlayId: string) => void;
    closeAll: () => void;
    unmountAll: () => void;
};

type OpenOverlayOptions = {
    overlayId?: string;
};

export function createOverlay(overlayId: string) {
    const [useOverlayEvent, createEvent] = createUseExternalEvents<OverlayEvent>(`${overlayId}/overlay`);

    const open = (controller: OverlayControllerComponent, options?: OpenOverlayOptions) => {
        const overlayId = options?.overlayId ?? randomId();
        const componentKey = randomId();
        const dispatchOpenEvent = createEvent('open');

        dispatchOpenEvent({ controller, overlayId, componentKey });
        return overlayId;
    };

    const close = createEvent('close');
    const unmount = createEvent('unmount');
    const closeAll = createEvent('closeAll');
    const unmountAll = createEvent('unmountAll');

    return { open, close, unmount, closeAll, unmountAll, useOverlayEvent };
}
