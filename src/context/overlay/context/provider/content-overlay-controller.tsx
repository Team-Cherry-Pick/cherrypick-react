import { useEffect, useRef } from 'react';

type OverlayControllerProps = {
    overlayId: string;
    isOpen: boolean;
    close: () => void;
    unmount: () => void;
};

export type OverlayControllerComponent = React.FC<OverlayControllerProps>;

type ContentOverlayControllerProps = {
    isOpen: boolean;
    current: string | null;
    overlayId: string;
    onMounted: () => void;
    onCloseModal: () => void;
    onExitModal: () => void;
    controller: OverlayControllerComponent;
};

export function ContentOverlayController({
    isOpen,
    current,
    overlayId,
    onMounted,
    onCloseModal,
    onExitModal,
    controller: Controller,
}: ContentOverlayControllerProps) {
    const prevCurrent = useRef(current);
    const onMountedRef = useRef(onMounted);

    if (prevCurrent.current !== current) {
        prevCurrent.current = current;

        if (current === overlayId) {
            onMountedRef.current();
        }
    }

    useEffect(() => {
        onMountedRef.current();
    }, []);

    return <Controller overlayId={overlayId} isOpen={isOpen} close={onCloseModal} unmount={onExitModal} />;
}
