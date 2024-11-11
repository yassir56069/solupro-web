import React                from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import { IosPickerItem }    from './carousel-ios-picker-item'

type PropType = {
  loop?: EmblaOptionsType['loop']
}

const BaggagePassengerPickerCarousel: React.FC<PropType> = (props) => {
  const { loop } = props

  return (
    <div className="
        embla
        
    ">
      <IosPickerItem
        slideCount={24}
        perspective="left"
        loop={loop}
        label="Baggage"
      />
      <IosPickerItem
        slideCount={60}
        perspective="right"
        loop={loop}
        label="Number of Passengers"
      />
    </div>
  )
}

export default BaggagePassengerPickerCarousel
