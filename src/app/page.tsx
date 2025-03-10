'use client'
import React, { useRef }        from 'react';

import TextSplashPage           from '../structures/interface-splash-page';
import BookingTransferFormCard  from '~/structures/interface-booking-transfer-card';
import InfoCards                from '~/structures/components/info-cards';
import InfoCard                 from '~/structures/components/info-card-atomic';
import InfoCardImg              from '~/structures/info-card-atomic-img';

export default function HomePage() {
  const bookingFormRef = useRef(null);

  return (
    <main>
        <TextSplashPage           bookingFormRef={bookingFormRef}/>
        <InfoCard/> 
        <BookingTransferFormCard  ref={bookingFormRef}/>
        <InfoCards/>
        <InfoCardImg/>
    </main>
  );
}
