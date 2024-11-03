import React from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import { PrevButton, NextButton,  usePrevNextButtons} from './carousel-buttons'
import useEmblaCarousel from 'embla-carousel-react'

type PropType = {
  slides: number[]
  options?: EmblaOptionsType
}

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options)

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi)

  const slide_height  = 'full';
  const slide_spacing = '1rem' ;
  const slide_size    = '100%' ;

  return (
<section className="">
  <div className="embla__viewport overflow-hidden" ref={emblaRef}>
    <div
      className="embla__container flex"
      style={{ marginLeft: `{calc( ${slide_spacing} * 10)}`, touchAction: "pan-y pinch-zoom" }}
    >
      {slides.map((index) => (
        <div
          className="embla__slide transform translate-z-0"
          style={{
            flex: `0 0 ${slide_size}`,
            minWidth: "0",
            paddingLeft: slide_spacing,
          }}
          key={index}
        >
          <div
            className="embla__slide__number shadow-inner rounded-full text-4xl font-semibold flex items-center justify-center"
            style={{ height: slide_height,  userSelect: "none" }}
          >
            {index + 1}
          </div>
        </div>
      ))}
    </div>
  </div>

  <div className="embla__controls  flex  justify-left gap-3 mt-7">
    <div className="embla__buttons grid grid-cols-2 gap-1.5 items-left">
      <PrevButton
        onClick={onPrevButtonClick}
        disabled={prevBtnDisabled}
        className="embla__button flex touch-manipulation text-transparent cursor-pointer border-1 p-0 m-0 shadow-inner rounded-full w-3 h-3 items-center justify-center"
        style={{
          WebkitTapHighlightColor: "rgba(var(--text-high-contrast-rgb-value), 0.5)",
          WebkitAppearance: "none",
          appearance: "none",
          backgroundColor: "transparent",
          zIndex: 1,
          color: "var(--text-body)",
        }}
      />
      <NextButton
        onClick={onNextButtonClick}
        disabled={nextBtnDisabled}
        className="embla__buttone flex touch-manipulation text-transparent cursor-pointer border-1 p-0 m-0 shadow-inner rounded-full w-3 h-3 items-center justify-center"
        style={{
          WebkitTapHighlightColor: "rgba(var(--text-high-contrast-rgb-value), 0.5)",
          WebkitAppearance: "none",
          appearance: "none",
          backgroundColor: "transparent",
          zIndex: 1,
          color: "var(--text-body)",
        }}
      />
    </div>
  </div>
</section>

  )
}

export default EmblaCarousel
