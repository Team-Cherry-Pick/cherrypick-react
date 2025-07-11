import { OverlayControllerComponent } from './provider/content-overlay-controller';

type OverlayId = string;
type OverlayItem = {
    /**
     * @description 오버레이 고유 식별자
     */
    id: string;
    /**
     * @description 오버레이 컴포넌트 키
     * unmounted 될 때 오버레이 컴포넌트를 식별하기 위해 사용
     */
    componentKey: string;
    isOpen: boolean;
    controller: OverlayControllerComponent;
};
export type OverlayData = {
    current: OverlayId | null;
    overlayOrderList: OverlayId[];
    overlayData: Record<OverlayId, OverlayItem>;
};

type OverlayReducerAction =
    | { type: 'ADD'; overlay: OverlayItem }
    | { type: 'OPEN'; overlayId: string }
    | { type: 'CLOSE'; overlayId: string }
    | { type: 'REMOVE'; overlayId: string }
    | { type: 'CLOSE_ALL' }
    | { type: 'REMOVE_ALL' };

export function overlayReducer(state: OverlayData, action: OverlayReducerAction): OverlayData {
    switch (action.type) {
        case 'ADD': {
            const isExisted = state.overlayOrderList.includes(action.overlay.id);

            if (isExisted && state.overlayData[action.overlay.id].isOpen === true) {
                throw new Error('같은 오버레이 ID를 가진 여러 개의 오버레이를 열 수 없습니다. 다른 ID를 사용하세요.');
            }

            return {
                current: action.overlay.id,
                /**
                 * @description 다시 열리면 오버레이를 앞으로
                 */
                overlayOrderList: [
                    ...state.overlayOrderList.filter(item => item !== action.overlay.id),
                    action.overlay.id,
                ],
                overlayData: isExisted
                    ? state.overlayData
                    : {
                          ...state.overlayData,
                          [action.overlay.id]: action.overlay,
                      },
            };
        }
        case 'OPEN': {
            const overlay = state.overlayData[action.overlayId];

            if (overlay == null || overlay.isOpen) {
                return state;
            }

            return {
                ...state,
                overlayData: {
                    ...state.overlayData,
                    [action.overlayId]: {
                        ...overlay,
                        isOpen: true,
                    },
                },
            };
        }
        case 'CLOSE': {
            const overlay = state.overlayData[action.overlayId];

            if (overlay == null || !overlay.isOpen) {
                return state;
            }

            const openedOverlayOrderList = state.overlayOrderList.filter(
                orderedOverlayId => state.overlayData[orderedOverlayId].isOpen === true,
            );
            const targetIndexInOpenedList = openedOverlayOrderList.findIndex(item => item === action.overlayId);

            /**
             * @description 마지막 오버레이를 닫는 경우, 그 앞의 오버레이 지정
             * @description 중간 오버레이를 닫는 경우, 마지막 오버레이 지정
             *
             * @example open - [1, 2, 3, 4]
             * close 2 => current: 4
             * close 4 => current: 3
             * close 3 => current: 1
             * close 1 => current: null
             */
            const currentOverlayId =
                targetIndexInOpenedList === openedOverlayOrderList.length - 1
                    ? (openedOverlayOrderList[targetIndexInOpenedList - 1] ?? null)
                    : (openedOverlayOrderList.at(-1) ?? null);

            return {
                ...state,
                current: currentOverlayId,
                overlayData: {
                    ...state.overlayData,
                    [action.overlayId]: {
                        ...state.overlayData[action.overlayId],
                        isOpen: false,
                    },
                },
            };
        }
        case 'REMOVE': {
            const overlay = state.overlayData[action.overlayId];

            if (overlay == null) {
                return state;
            }

            const remainingOverlays = state.overlayOrderList.filter(item => item !== action.overlayId);
            if (state.overlayOrderList.length === remainingOverlays.length) {
                return state;
            }

            const copiedOverlayData = { ...state.overlayData };
            delete copiedOverlayData[action.overlayId];

            const openedOverlayOrderList = state.overlayOrderList.filter(
                orderedOverlayId => state.overlayData[orderedOverlayId].isOpen === true,
            );
            const targetIndexInOpenedList = openedOverlayOrderList.findIndex(item => item === action.overlayId);

            /**
             * @description 마지막 오버레이를 닫는 경우, 그 앞의 오버레이 지정
             * @description 중간 오버레이를 닫는 경우, 마지막 오버레이 지정
             *
             * @example open - [1, 2, 3, 4]
             * unmount 2 => current: 4
             * unmount 4 => current: 3
             * unmount 3 => current: 1
             * unmount 1 => current: null
             */
            const currentOverlayId =
                targetIndexInOpenedList === openedOverlayOrderList.length - 1
                    ? (openedOverlayOrderList[targetIndexInOpenedList - 1] ?? null)
                    : (openedOverlayOrderList.at(-1) ?? null);

            return {
                current: currentOverlayId,
                overlayOrderList: remainingOverlays,
                overlayData: copiedOverlayData,
            };
        }
        case 'CLOSE_ALL': {
            if (Object.keys(state.overlayData).length === 0) {
                return state;
            }

            return {
                ...state,
                current: null,
                overlayData: Object.keys(state.overlayData).reduce(
                    (prev, curr) => ({
                        ...prev,
                        [curr]: {
                            ...state.overlayData[curr],
                            isOpen: false,
                        } satisfies OverlayItem,
                    }),
                    {} satisfies Record<string, OverlayItem>,
                ),
            };
        }
        case 'REMOVE_ALL': {
            return { current: null, overlayOrderList: [], overlayData: {} };
        }
    }
}
