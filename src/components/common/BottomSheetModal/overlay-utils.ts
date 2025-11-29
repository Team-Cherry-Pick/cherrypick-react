import React, { ReactNode } from 'react';
import { overlay } from '@/context/overlay';
import BottomSheetModal from './BottomSheetModal';
import ImageBottomSheet from './ImageBottomSheet';
import { OverlayControllerComponent } from '@/context/overlay';

interface BottomSheetOptions {
  emoji?: string;
  title: string;
  content: string | ReactNode;
  positiveButtonText: string;
  negativeButtonText: string;
  onPositiveClick: () => void;
  onNegativeClick: () => void;
}

// overlay.open 형태로 사용할 수 있는 BottomSheetModal 래퍼
export const openBottomSheet = (options: BottomSheetOptions) => {
  const BottomSheetController: OverlayControllerComponent = (props) => {
    const handlePositiveClick = () => {
      options.onPositiveClick();
      props.close();
    };

    const handleNegativeClick = () => {
      options.onNegativeClick();
      props.close();
    };

    return React.createElement(BottomSheetModal, {
      isOpen: props.isOpen,
      onClose: props.close,
      emoji: options.emoji,
      title: options.title,
      content: options.content,
      positiveButtonText: options.positiveButtonText,
      negativeButtonText: options.negativeButtonText,
      onPositiveClick: handlePositiveClick,
      onNegativeClick: handleNegativeClick,
    });
  };

  return overlay.open(BottomSheetController);
};

// 더 간단한 사용을 위한 헬퍼 함수들
export const bottomSheetUtils = {
  // 확인 다이얼로그
  confirm: (title: string, content: string | ReactNode) => {
    return new Promise<boolean>((resolve) => {
      openBottomSheet({
        title,
        content,
        positiveButtonText: '확인',
        negativeButtonText: '취소',
        onPositiveClick: () => resolve(true),
        onNegativeClick: () => resolve(false),
      });
    });
  },

  // 알림 다이얼로그
  alert: (title: string, content: string | ReactNode, buttonText = '확인') => {
    return new Promise<void>((resolve) => {
      openBottomSheet({
        title,
        content,
        positiveButtonText: buttonText,
        negativeButtonText: '취소',
        onPositiveClick: () => resolve(),
        onNegativeClick: () => resolve(),
      });
    });
  },

  // 커스텀 다이얼로그
  custom: openBottomSheet,
};

// 이미지 전용 바텀시트
interface ImageBottomSheetOptions {
  imageUrl: string;
  alt?: string;
  onClick?: () => void;
  positiveButtonText?: string;
  negativeButtonText?: string;
  onPositiveClick?: () => void;
  onNegativeClick?: () => void;
}

export const openImageBottomSheet = (options: ImageBottomSheetOptions) => {
  const ImageBottomSheetController: OverlayControllerComponent = (props) => {
    const handleImageClick = () => {
      if (options.onClick) {
        options.onClick();
      }
    };

    const handlePositiveClick = () => {
      if (options.onPositiveClick) {
        options.onPositiveClick();
      }
      props.close();
    };

    const handleNegativeClick = () => {
      if (options.onNegativeClick) {
        options.onNegativeClick();
      }
      props.close();
    };

    return React.createElement(ImageBottomSheet, {
      isOpen: props.isOpen,
      onClose: props.close,
      imageUrl: options.imageUrl,
      alt: options.alt,
      onClick: handleImageClick,
      positiveButtonText: options.positiveButtonText,
      negativeButtonText: options.negativeButtonText,
      onPositiveClick: options.onPositiveClick ? handlePositiveClick : undefined,
      onNegativeClick: options.onNegativeClick ? handleNegativeClick : undefined,
    });
  };

  return overlay.open(ImageBottomSheetController);
};