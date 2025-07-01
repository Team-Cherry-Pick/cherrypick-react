export type EventType = string | symbol;
export type Handler<T = unknown> = (event: T) => void;
export type EventHandlerList<T = unknown> = Array<Handler<T>>;
export type EventHandlerMap<Events extends Record<EventType, unknown>> = Map<
    keyof Events,
    EventHandlerList<Events[keyof Events]>
>;

export interface Emitter<Events extends Record<EventType, unknown>> {
    all: EventHandlerMap<Events>;
    on<Key extends keyof Events>(type: Key, handler: Handler<Events[Key]>): void;
    off<Key extends keyof Events>(type: Key, handler?: Handler<Events[Key]>): void;
    emit<Key extends keyof Events>(type: Key, event: Events[Key]): void;
}

export function createEmitter<Events extends Record<EventType, unknown>>(
    all?: EventHandlerMap<Events>,
): Emitter<Events> {
    all = all || new Map();

    return {
        all,
        on<Key extends keyof Events>(type: Key, handler: Handler<Events[Key]>) {
            const handlers: Array<Handler<Events[Key]>> | undefined = all!.get(type);
            if (handlers) {
                handlers.push(handler);
            } else {
                all!.set(type, [handler] as EventHandlerList<Events[keyof Events]>);
            }
        },
        off<Key extends keyof Events>(type: Key, handler?: Handler<Events[Key]>) {
            const handlers: Array<Handler<Events[Key]>> | undefined = all!.get(type);
            if (handlers) {
                if (handler) {
                    // handler를 찾지 못했을 때 빈 배열을 반환
                    handlers.splice(handlers.indexOf(handler) >>> 0, 1);
                } else {
                    all!.set(type, []);
                }
            }
        },
        emit<Key extends keyof Events>(type: Key, event: Events[Key]) {
            const handlers = all!.get(type);
            if (handlers) {
                // 실행 중 다른 핸들러가 제거되어도 안전하게 동작하도록 배열의 복사본 사용
                (handlers as EventHandlerList<Events[keyof Events]>).slice().map(handler => {
                    handler(event);
                });
            }
        },
    };
}
