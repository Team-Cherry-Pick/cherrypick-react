import React, { useState } from 'react';
import * as S from '../ProductTopSection.style';
import LogoPic from '@/assets/icons/LogoPic.svg';
import LeftArrowIcon from '@/assets/icons/left-arrow-Icon.svg?react';
import RightArrowIcon from '@/assets/icons/right-arrow-Icon.svg?react';
import type { DealImage } from '@/types/Deal';

interface ImageCarouselProps {
  images: DealImage[];
}

export const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const totalImages = images.length;

  const goToSlide = (index: number) => {
    if (index < 0 || index >= totalImages) return;
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalImages);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalImages) % totalImages);
  };

  if (!images.length) {
    return (
      <S.MainImageWrapper>
        <S.MainImage src={LogoPic} alt="" />
      </S.MainImageWrapper>
    );
  }

  const calculateTranslateX = () => {
    return -currentIndex * 25; // 25% per slide
  };

  return (
    <S.CarouselContainer>
      <S.CarouselWrapper>
        <S.CarouselSlides translateX={calculateTranslateX()}>
          {images.map((image, index) => (
            <S.CarouselSlide key={`${image.imageId}-${index}`}>
              <S.CarouselImage
                src={image.url || LogoPic}
                alt={`Product image ${index + 1}`}
                onError={(e) => {
                  e.currentTarget.src = LogoPic;
                }}
              />
            </S.CarouselSlide>
          ))}
        </S.CarouselSlides>

        {/* Navigation Buttons */}
        {totalImages > 1 && (
          <>
            <S.CarouselNavButton
              direction="left"
              onClick={prevSlide}
            >
              <LeftArrowIcon style={{ color: 'white', fill: 'white' }} />
            </S.CarouselNavButton>
            <S.CarouselNavButton
              direction="right"
              onClick={nextSlide}
            >
              <RightArrowIcon style={{ color: 'white', fill: 'white' }} />
            </S.CarouselNavButton>
          </>
        )}

        {/* Indicators */}
        {totalImages > 1 && (
          <S.CarouselIndicators>
            {images.map((_, index) => (
              <S.CarouselIndicator
                key={index}
                active={index === currentIndex}
                onClick={() => goToSlide(index)}
              />
            ))}
          </S.CarouselIndicators>
        )}
      </S.CarouselWrapper>
    </S.CarouselContainer>
  );
};
