import React                                          from 'react'
import useEmblaCarousel                               from 'embla-carousel-react'
import { useState }                                   from 'react'
import { EmblaOptionsType }                           from 'embla-carousel'
import Image                                          from 'next/image'
import { PrevButton, NextButton,  usePrevNextButtons} from './carousel-buttons'

type PropType = {
  slides: Record<string, string>
  options?: EmblaOptionsType
}

const EmblaCarousel = ({ selectedSlide, setSelectedSlide, ...props}:any) => {
  const { slides, options } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options)

  
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi)

  const slide_height  = '10rem';
  const slide_spacing = '.5rem' ;
  const slide_size    = '80%' ;


  const handleSlideClick = (index: number) => {
    setSelectedSlide(index === selectedSlide ? null : index) // Toggle selected slide
  }

  return (
    <section className="">
      <div className="embla__viewport overflow-hidden cursor-grab rounded-xl h-[9rem]" ref={emblaRef}>
        <div
          className="embla__container flex"
          style={{ marginLeft: `calc(${slide_spacing} * -1)`, touchAction: "pan-y pinch-zoom" }}
        >
          {Object.entries(slides).map(([title, src], index) => (
            <div
              className="embla__slide transform translate-z-0"
              style={{
                flex: `0 0 ${slide_size}`,
                minWidth: "0",
                paddingLeft: slide_spacing,
              }}
              key={index}
              onClick={() => handleSlideClick(index)}
            >
              <div
                className={`embla__slide__image relative shadow-inner rounded-xl h-[9rem] overflow-hidden flex items-center justify-center`}
                style={{ userSelect: "none" }}
              >
                <Image
                  src={src as string}
                  alt={title}
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="object-cover w-full h-full"
                />

                {/* Default gradient overlay */}
                <div
                  className={`absolute bottom-0 left-0 right-0 h-full transition-opacity ${
                    selectedSlide === index ? 'opacity-0' : 'bg-gradient-to-t from-transparent to-blck opacity-75 hover:opacity-90'
                  }`}
                ></div>
                
                {/* Selected gradient overlay */}
                {selectedSlide === index && (
                  <div
                    className="absolute bottom-0 left-0 right-0 h-full bg-gradient-to-t from-even-darker to-main-acc-orange opacity-90"
                  ></div>
                )}
              </div>
              {/* Title */}
              <div className="absolute top-0 left-10 right-0 p-4 text-white font-semibold text-lg">
                {title}
              </div>
            </div>
          ))}
        </div>
      </div>


  <div className="embla__controls  flex  justify-center md:justify-start  md:gap-3 md:mt-4 mt-5 ">
    <div className="embla__buttons flex gap-6 md:gap-1.5 items-center">
      <PrevButton
        onClick={onPrevButtonClick}
        disabled={prevBtnDisabled}
        className="embla__button flex touch-manipulation text-transparent cursor-pointer border-1 p-0 mr-3 m-0 shadow-inner rounded-full w-4 h-4 md:w-3 md:h-3 items-center justify-center"
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
        className="embla__button flex touch-manipulation text-transparent cursor-pointer border-1 p-0 m-0 shadow-inner rounded-full w-4 h-4 md:w-3 md:h-3 items-center justify-center"
        style={{
          WebkitTapHighlightColor: "rgba(var(--text-high-contrast-rgb-value), 0.5)",
          WebkitAppearance: "none",
          appearance: "none",
          backgroundColor: "transparent",
          zIndex: 1,
          color: "var(--text-body)",
        }}
      />
          <p className="flex items-center">
            {selectedSlide !== null ? `You've selected ${Object.keys(slides)[selectedSlide]}` : ' Select A Car Type'}
          </p>
    </div>
  </div>
</section>

  )
}

export default EmblaCarousel
