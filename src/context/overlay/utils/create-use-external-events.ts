import { useLayoutEffect } from 'react';
import { createEmitter } from './emitter';

const emitter = createEmitter();
function useClientLayoutEffect(...args: Parameters<typeof useLayoutEffect>) {
    if (typeof document === 'undefined') {
        return;
    }

    // eslint-disable-next-line  react-hooks/exhaustive-deps, react-hooks/rules-of-hooks
    useLayoutEffect(...args);
}

function dispatchEvent<Detail>(type: string, detail?: Detail) {
    emitter.emit(type, detail);
}

// 이벤트 만들 때, params는 any 타입이 될 수 있음
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createUseExternalEvents<EventHandlers extends Record<string, (params: any) => void>>(prefix: string) {
    function useExternalEvents(events: EventHandlers) {
        const handlers = Object.keys(events).reduce<Record<string, () => void>>((prev, eventKey) => {
            const currentEventKeys = `${prefix}:${eventKey}`;

            return {
                ...prev,
                [currentEventKeys]: function (event: unknown) {
                    events[eventKey](event);
                } as () => void,
            };
        }, {});

        useClientLayoutEffect(() => {
            Object.keys(handlers).forEach(eventKey => {
                // 중복 등록 방지
                emitter.off(eventKey, handlers[eventKey]);
                emitter.on(eventKey, handlers[eventKey]);
            });

            return () =>
                Object.keys(handlers).forEach(eventKey => {
                    emitter.off(eventKey, handlers[eventKey]);
                });
        }, [handlers]);
    }

    function createEvent<EventKey extends keyof EventHandlers>(event: EventKey) {
        return (...payload: Parameters<EventHandlers[EventKey]>) =>
            dispatchEvent(`${prefix}:${String(event)}`, payload[0]);
    }

    return [useExternalEvents, createEvent] as const;
}
